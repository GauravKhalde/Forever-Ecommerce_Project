import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Add from './pages/Add'
import List from './pages/List'
import { Routes, Route } from 'react-router-dom'
import Orders from './pages/Orders'
import Login from './components/Login'
export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";
import { ToastContainer } from 'react-toastify';




const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])
  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === ""
        ? <Login setToken={setToken} />
        : <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/orders' element={<Orders token={token} />} />

                {/* The token is passed to <Orders> (and other pages) so they can send it in API requests to access protected admin data.
                  It’s stored in App.jsx because App controls which components to show based on login status. */}

              </Routes>

            </div>
          </div>
        </>}


    </div>

  )
}

export default App