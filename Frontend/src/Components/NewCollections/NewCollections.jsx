import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import new_collection from '../../assets/new_collections'
import Item from '../Item/Item'

const NewCollections = () => {

  const [newCollection,setNewCollections]=useState([]);
  const fetchApi=async()=>{
    const url=`https://fakestoreapi.com/products?limit=8`;
    const response =await fetch(url);
    const data=await response.json();
    setNewCollections(data);
  }
  useEffect(()=>{
    fetchApi()
  },[])
  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
             {newCollection.map((item,index)=>{
                return <Item key={index} id={item.id} name={item.title} image={item.image} new_price={item.price} old_price={item.price}/>
             })}
      </div>
    </div>
  )
}

export default NewCollections
