import { createContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import axios from 'axios'



export const ShopContext = createContext();

const ShopContextProvider = (props) => { 
    const currency = '$'; 
    const delivery_fee = 10; 
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([])
    const [token,setToken] = useState('')

    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {
        if(!size){
            toast.error('select Product Size');
            return;
        }
       
        let cartData = structuredClone(cartItems);
        if(cartData[itemId])
            {   
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }
            else{
                cartData[itemId][size] = 1;
            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
        if(token){
            try{
                console.log(token)
                   console.log(itemId)
                console.log(size)
                await axios.post(backendUrl + 'api/cart/add',{itemId, size}, {headers:{token}})
            }
            catch(error){
                console.log(error)
            }
        }
    }


    const getCartCount = () => {
    let totalCount = 0;  // Start with 0 items in the cart

    for (const items in cartItems) {  // Loop through each product in the cart
        for (const item in cartItems[items]) {  // Loop through each size of that product
            try {
                if (cartItems[items][item] > 0) {  // If quantity is more than 0
                    totalCount += cartItems[items][item];  // Add quantity to total count
                }
            } catch (error) {
                console.log(error)
                // Ignore errors (in case of unexpected values)
            }
        }
    }


//     1st Loop (productId in cartItems)
// Goes over each product in your cart

// 2nd Loop (size in cartItems[productId])
// Goes over each size for that product
    return totalCount;  // Return the total number of items in cart
};




 const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
        if(token){
            try{
                await axios.post(backendUrl + 'api/cart/update', {itemId, size, quantity},{headers:{token}})
            }catch(error){
            console.log(error)
            toast.error(error.message)
         }
        }
      

 }






 const getCartAmount =()=>{
    let totalAmount =0;
    for(const items in cartItems){
        let itemInfo = products.find((product)=> product._id === items);
        for(const item in cartItems[items]){
            try{
                if(cartItems[items][item]>0){
                    totalAmount += itemInfo.price * cartItems[items][item]
                }
            }
            catch(error){
            console.log(error)
            toast.error(error.message)
            }
        }
    }
    return totalAmount;
 }


 const getProductsData = async()=>{
    try{
        const response= await axios.get(backendUrl + 'api/product/list')
        // console.log(response,"@@@@@@@@@@@@@@@@")
        if(response.data.success){
            setProducts(response.data.products)
        }
else{
    toast.error(response.data.message)
}
    }catch(error){
       console.log(error)
       toast.error(error.message)
    }
 }

const getUserCart = async(token)=>{
    //   console.log("🔵 [Step 3] Fetching cart with token:", token);

try{
const response=await axios.post(backendUrl + 'api/cart/get', {}, {headers:{token}})
if(response.data.success){
        //   console.log("🟣 [Step 4] Cart data fetched:", response.data.cartData);

    setCartItems(response.data.cartData)
}

}catch(error){
    // console.log(error)
        console.log("🔴 [Step 5] Error in getUserCart:", error);

    toast.error(error.message)
    }
}




 useEffect(()=>{
    getProductsData();
 },[])

 useEffect(()=>{
    // getProductsData();
 },[cartItems])

//  useEffect(()=>{
//     if(!token && localStorage.getItem('token')){
//         setToken(localStorage.getItem('token'))
//         getUserCart(localStorage.getItem('token'))
//     }
//  },[])

useEffect(() => {
  const localToken = localStorage.getItem("token");
//   console.log("🟡 [Step 1] Reading token from localStorage:", localToken);
  if (localToken) {
    setToken(localToken);
  }
}, []);

useEffect(() => {
//   console.log("🟢 [Step 2] token state updated:", token);
  if (token) {
    getUserCart(token);
  }
}, [token]);









    const value = { 
        products, currency, delivery_fee,
        search,setSearch,showSearch,setShowSearch,cartItems,addToCart,getCartCount,updateQuantity,getCartAmount,navigate,backendUrl,setToken,token,
        setCartItems
    } 

    return(
            <ShopContext.Provider value={value}>
                {props.children}
            </ShopContext.Provider>
        
    )

}

export default ShopContextProvider