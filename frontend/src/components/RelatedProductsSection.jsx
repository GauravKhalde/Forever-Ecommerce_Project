import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import Productitem from "./Productitem";

const RelatedProductsSection = ({ category, subCategory }) => {
  const {products} = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      // Step 1: Filter products to only those that match the selected main category (e.g., "Men", "Women", "Kids")
      productsCopy = productsCopy.filter((item) => category === item.category);

      // Step 2: From the already filtered products, further filter to match the selected sub-category (e.g., "Topwear")
     productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);
      setRelated(productsCopy.slice(0, 5));
    }
  },[products]);

  return <div className="my-24">
  <div className="text-center text-3xl py-2">
  <Title text1={'RELATED'} text2={'PRODUCTS'}/>
  </div>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6">
{
    related.map((item,index)=>(
        <Productitem key={index} id={item._id} name={item.name} price={item.price} image={item.images}/>
    ))
}
  </div>

  </div>;
};

export default RelatedProductsSection;
