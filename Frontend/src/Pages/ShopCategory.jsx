import React, { useEffect, useState } from 'react'
import './CSS/ShopCategory.css'
import dropdown_icon from "../assets/dropdown_icon.png"
import Item from '../Components/Item/Item.jsx'
import men_banner from '../assets/banner_mens.png'
import women_banner from '../assets/banner_women.png'
import banner from '../assets/banner_kids.png'

const ShopCategory = ({category}) => {
  const [storeData,setStoreData] = useState([]);
  const fetchApi=async()=>{
   const url=`https://fakestoreapi.com/products/category/${category}`;
   const response =await fetch(url);
   const data=await response.json();
   setStoreData(data);
   
  };
  useEffect(()=>{
    fetchApi();
   },[category]);

   const getBanner = () => {
    if (category === "men's clothing") return men_banner;
    if (category === "women's clothing") return women_banner;
    if (category === "electronics") return banner;
    if (category === "jewelery") return banner;
    
  };
  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={getBanner()} alt="Category Banner" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-{storeData.length}</span> out of {storeData.length} products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
      {storeData.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.title}
            image={item.image}
            new_price={item.price}
            old_price={item.price}
          />
        ))}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  )
}

export default ShopCategory
