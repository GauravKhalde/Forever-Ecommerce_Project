
import userModel from "../models/userModel.js";


// add products to user cart
const addToCart = async (req, res) => {
try {
    // 1. Extract userId, itemId, size from the request sent from frontend
    const { userId, itemId, size } = req.body;
    // 📝 Example: userId = "123", itemId = "tshirt001", size = "M"

    // 2. Find the user in the database using the userId
    const userData = await userModel.findById(userId);
    // 📦 Finds the user and gets their saved cart

    // 3. Get the current cart data from the user document
    let cartData = await userData.cartData;
    // 🛒 cartData = {
    //   "tshirt001": { "S": 1, "M": 2 },
    //   "jeans007": { "32": 1 }
    // }

    // 4. Check if this product is already in the cart
    if (cartData[itemId]) {
        // ✅ Product already exists

        // 5. If the same size exists, increase the quantity
        if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;
            // 👕 Already had 2 "M" size T-shirts → now becomes 3
        }
        // 6. If the size is new, set quantity to 1
        else {
            cartData[itemId][size] = 1;
            // 👕 First time adding "L" size → now cart has: { M: 2, L: 1 }
        }
    }
    // 7. If product is not in cart at all
    else {
        cartData[itemId] = {};               // Create a new item in cart
        cartData[itemId][size] = 1;          // Set first size and quantity
        // 🛒 Now cartData = { "tshirt001": { "M": 1 } }
    }

    // 8. Save the updated cart back to the database
    await userModel.findByIdAndUpdate(userId, { cartData });

    // 9. Send success message to frontend
    res.json({ success: true, message: "Product added to cart successfully" });
} catch (error) {
    // 10. Handle any errors and inform frontend
    console.log(error);
    res.json({ success: false, message: error.message });
}







}



// update user cart
const updateCart = async (req, res) => {
 try{
        const { userId, itemId, size, quantity } = req.body
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity
        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({success: true, message: "Cart updated successfully"});
    }
    catch(error){
        console.log(error)
        res.json({success: false, message: error.message});
    }




}



// get user cart
const getUserCart = async (req, res) => {

     try{
        const { userId } = req.body;
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;
        res.json({success: true, cartData});
    }
    catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}


export {addToCart,updateCart,getUserCart}