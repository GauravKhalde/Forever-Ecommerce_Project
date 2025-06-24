import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(backendUrl + 'api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // const statusHandler = async (event, orderId) => {
  //   try {
  //     const response = await axios.post(
  //       `${backendUrl}/api/order/status`,
  //       { orderId, status: event.target.value },
  //       { headers: { token } }
  //     )
  //     if (response.data.success) {
  //       toast.success('Order status updated')
  //       await fetchAllOrders()
  //     } else {
  //       toast.error(response.data.message)
  //     }
  //   } catch (error) {
  //     toast.error(error.message)
  //   }
  // }


  const statusHandler = async (event, orderId)=>{
     try{
    const response = await axios.post(backendUrl + 'api/order/status',{orderId,status:event.target.value}, {headers:{token}})
    if(response.data.success){
      await fetchAllOrders();
    }
     }catch(error){
      console.log(error);
      toast.error(response.data.message)
      

     }
  }





  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <div className="px-4">
      <h3 className="text-lg font-semibold mb-4">Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div
            key={index}
            className="flex items-start gap-6 border border-gray-300 rounded-md p-4 mb-4 flex-wrap sm:flex-nowrap"
          >
            {/* Parcel Icon */}
            <div className="w-12 flex-shrink-0">
              <img className="w-full" src={assets.parcel_icon} alt="Parcel Icon" />
            </div>

            {/* Order Items */}
            <div className="min-w-[180px]">
              {order.items.map((item, idx) => (
                <p key={idx} className="text-sm text-gray-700">
                  {item.name} x {item.quantity} <span>{item.size}</span>{idx !== order.items.length - 1 && ','}
                </p>
              ))}
            </div>

            {/* Address Info */}
            <div className="min-w-[180px] text-gray-600 text-sm">
              <p className="font-semibold">{order.address.firstName} {order.address.lastName}</p>
              <p>{order.address.street}</p>
              <p>{order.address.city}, {order.address.state}</p>
              <p>{order.address.country} - {order.address.zipcode}</p>
              <p>{order.address.phone}</p>
            </div>

            {/* Payment Info */}
            <div className="min-w-[150px] text-gray-700 text-sm">
              <p>Items: {order.items.length}</p>
              <p>Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Done" : "Pending"}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Amount */}
            <div className="min-w-[80px] font-bold text-gray-800 text-sm">
              {currency}{order.amount}
            </div>

            {/* Status Dropdown */}
            <div className="min-w-[160px]">
              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                className="border px-2 py-1 rounded-md text-sm font-semibold">
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
