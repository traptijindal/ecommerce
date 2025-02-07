import React, { useEffect, useState } from 'react'
import './Popular.css'
import data_product from '../../assets/data'
import Item from '../Item/Item'

const Popular = () => {
  const [popularData,setPopularData]=useState([]);
  const fetchApi=async()=>{
    const url=`https://fakestoreapi.com/products/category/women's clothing?limit=4`;
    const response=await fetch(url);
    const data=await response.json();
    setPopularData(data);
  }
  useEffect(()=>{
    fetchApi();
  },[])
  return (
    <div className='popular'>
       <h1>POPULAR IN WOMEN</h1>
       <hr />
       <div className="popular-item">
         {popularData.map((item,index)=>{
            return <Item key={index} id={item.id} name={item.title} image={item.image} new_price={item.price} old_price={item.price}/>
         })}
       </div>
    </div>
  )
}

export default Popular
