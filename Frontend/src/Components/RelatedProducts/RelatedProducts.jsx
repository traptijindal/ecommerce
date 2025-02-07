import React, { useEffect, useState } from 'react'
import "./RelatedProduct.css"
import Item from '../Item/Item';


const RelatedProducts = (props) => {
    const[relatedProduct,setRelatedProduct]=useState([]);
    const {product}=props
    const category=product.category;
    const fetchData=async()=>{
        const url=`https://fakestoreapi.com/products/category/${category}`
        const response=await fetch(url);
        const data=await response.json();
        setRelatedProduct(data);
    }

    useEffect(()=>{
        fetchData();
    },[category])
  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
         {relatedProduct.map((item,index)=>{
            return <Item key={index} id={item.id} name={item.title} image={item.image} new_price={item.price} old_price={item.price}/>
         })}
      </div>
    </div>
  )
}

export default RelatedProducts
