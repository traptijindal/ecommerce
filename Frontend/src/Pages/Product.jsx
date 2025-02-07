// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import ProductCard from '../Components/ProductCard/ProductCard';

// const Product = () => {
//   const {productId}=useParams();
//   const [product, setProduct] = useState({});
//   const fetchData=async()=>{
//     const url=`https://fakestoreapi.com/products/${productId}`;
//     const response=await fetch(url);
//     const data=await response.json();
//     setProduct(data);
    
//   }
  
//     useEffect(()=>{
//       fetchData()
//     },[productId])

//   return (
//     <div>
//         <ProductCard product={product} />
//     </div>
//   )
// }

// export default Product


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../Components/ProductCard/ProductCard';
import '../Pages/CSS/Product.css'
import loaderGif from '/DualBall@1x-1.0s-200px-200px4.gif';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import Description from '../Components/Description/Description';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  const fetchData = async () => {
    try {
      const url = `https://fakestoreapi.com/products/${productId}`;
      const response = await fetch(url);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

 
  useEffect(() => {
     fetchData();
  }, [productId]);

  if (!product) {
    return <div style={{ 
      background: `#292b38 url(${loaderGif}) no-repeat center center`, 
      backgroundSize: '10%', 
      height: '100vh', 
      width: '100%', 
      position: 'fixed', 
      zIndex: 100 
    }}></div>
    
  }

  return (
    <div>
      <ProductCard product={product} />
      <ProductDisplay product={product}/>
      <Description product={product}/>
      <RelatedProducts product={product}/>
    </div>
  );
};

export default Product;
