// import { currency } from "../../admin/admin/src/App.jsx";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'

//global variables
const currency='USD'
const deliveryCharge = 10 

//gateway initialize
const stripe=  new Stripe(process.env.STRIPE_SECRET_KEY)



//Placing Order using COD Method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now()
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });

  } catch (error) {
  console.log("❌ Error placing order:", error); // ✅ Show full stack
  res.status(500).json({ success: false, message: error.message });
  }
};



//Placing Order using Stripe Method
const placeOrderStripe = async(req,res)=>{
try{
    const { userId, items, amount, address } = req.body;
    const {origin} = req.headers;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now()
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

     const line_items= items.map((item)=>({
      price_data:{
        currency:currency,
        product_data:{
          name:item.name
        },
        unit_amount: item.price * 100
},
quantity:item.quantity
     }))
     line_items.push({
      price_data:{
        currency:currency,
        product_data:{
          name:'Delivery Charges'
        },
        unit_amount: deliveryCharge * 100
},
quantity: 1

     })

    const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'], // optional, but safe
  mode: 'payment',                // ✅ This is required!
  line_items: line_items,         // ✅ You already created this above
  success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
  cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`
});

     res.json({success:true,session_url:session.url})
}catch(error){
console.log(error)
res.json({success:false,message:error.message})
}
}



// verify stripe
const verifyStripe = async(req,res)=>{
  const {orderId, success}= req.body

  try{
if (success === 'true'){
  await orderModel.findByIdAndUpdate(orderId, {payment:true});
  await userModel.findByIdAndUpdate(userId,{cartData: {}})
  res.json({success:true})
}
else{
  await orderModel.findByIdAndDelete(orderId)
  res.json({success:false})
}
  }catch(error){
    console.log(error)
    res.json({success:false,message:error.message})


  }
}


//Placing Order using Razorpay Method
const placeOrderRazorpay = async(req,res)=>{

}


//All Order data for Admin panel 
const allOrders = async(req,res)=>{
try{
  const orders = await orderModel.find({})
  res.json({success:true,orders})

}catch(error) {
console.log(error)
res.json({success:false,message:error.message})
}
}


//User Order data for Frontend  
const userOrders = async(req,res)=>{
try{
  const {userId} = req.body
   const orders = await orderModel.find({userId})
   res.json({success:true,orders})

}catch(error){
console.log(error)
res.json({success:false,message:error.message})
}
}



//Update Order Status from Admin panel 
const updateStatus = async(req,res)=>{
try{
const{orderId,status} = req.body

await orderModel.findByIdAndUpdate(orderId, {status})
res.json({success:true,message:'Status Updated'})

}catch(error){
console.log(error)
res.json({success:false,message:error.message})
}
}


export {verifyStripe,placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus}