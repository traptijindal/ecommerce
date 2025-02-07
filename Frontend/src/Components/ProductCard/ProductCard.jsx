import React from 'react';
import arrow_icon from '../../assets/greaterThan.webp'
import './ProductCard.css'

const ProductCard = ({ product }) => {
  return (
    <div className='data'>
      <p>HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> {product.category} <img src={arrow_icon} alt="" /> {product.title}</p>
    </div>
  );
};

export default ProductCard;
