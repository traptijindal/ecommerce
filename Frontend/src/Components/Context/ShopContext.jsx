import React,{createContext, useEffect, useState} from 'react'

export const ShopContext = createContext(null);

const ShopContextProvider =(props)=>{
    const [all_product, setAllProduct] = useState([]);
    const [cartItems, setCartItems] = useState({});

    const getDefaultCart = (products) => {
      let cart = {};
      products.forEach((product) => {
        cart[product.id] = 0;
      });
      return cart;
    };
  
    const fetchData = async () => {
     
        const url = `https://fakestoreapi.com/products`;
        const response = await fetch(url);
        const data = await response.json();
        setAllProduct(data);
        

        setCartItems(getDefaultCart(data));
      
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const addToCart =(itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        console.log(cartItems);
    } 

    const removeFromCart =(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount = () => {
      let totalAmount = 0;
      for (const item in cartItems) {
        if (cartItems[item] > 0) {
          let itemInfo = all_product.find((product) => product.id === Number(item));
          if (itemInfo) {
            totalAmount += itemInfo.price * cartItems[item];
          }
        }
      }
      return totalAmount.toFixed(2); 
    };

    const getTotalCartItems=()=>{
      let totalItem=0;
      for(const item in cartItems){
        if(cartItems[item]>0){
          totalItem+=cartItems[item];
        }
      }
      return totalItem;
    }
    
    const contextValue = { all_product, cartItems,addToCart,removeFromCart,getTotalCartAmount,getTotalCartItems };
  
    return (
      <ShopContext.Provider value={contextValue}>
        {props.children}
      </ShopContext.Provider>
    );
  };
  
  export default ShopContextProvider;