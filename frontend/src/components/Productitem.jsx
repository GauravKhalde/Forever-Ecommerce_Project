import { useContext } from 'react';
import React from 'react'
import { ShopContext } from '../context/ShopContext.jsx';
import { Link } from 'react-router-dom';

const Productitem = ({ id, image, name, price }) => {
      const { currency } = useContext(ShopContext); 
      console.log(image,"images");

  return (
    <div>
        <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
        <div className='overflow-hidden'>
         {/* <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" /> */}
         <img  className="hover:scale-110 transition ease-in-out" src={image && image.length > 0 ? image[0] :''}
  // src={image[0]}
  alt={name || 'Product image'}
/>

        </div>
        <p  className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'>{currency}{price}</p>

        </Link>
    </div>
  )
}

export default Productitem