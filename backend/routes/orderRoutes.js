import express, { Router }  from 'express'
import { placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus, verifyStripe } from '../controllers/ordercontroller.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'


const orderRouter= express.Router()

//Admin features
orderRouter.post("/list",adminAuth,allOrders )
orderRouter.post('/status',adminAuth,updateStatus)


//Payment Features

orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrder)

//user Feature

orderRouter.post('/userorders',authUser,userOrders)

//verify payment true or false 
orderRouter.post('/verifyStripe',authUser,verifyStripe)

export default orderRouter