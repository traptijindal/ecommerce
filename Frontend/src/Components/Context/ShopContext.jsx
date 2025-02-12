// import React,{createContext, useEffect, useState} from 'react'

// export const ShopContext = createContext(null);

// const ShopContextProvider =(props)=>{
//     const [all_product, setAllProduct] = useState([]);
//     const [cartItems, setCartItems] = useState({});

//     const getDefaultCart = (products) => {
//       let cart = {};
//       products.forEach((product) => {
//         cart[product.id] = 0;
//       });
//       return cart;
//     };
  
//     const fetchData = async () => {
     
//         const url = `https://fakestoreapi.com/products`;
//         const response = await fetch(url);
//         const data = await response.json();
//         setAllProduct(data);
        

//         setCartItems(getDefaultCart(data));
      
//     };
  
//     useEffect(() => {
//       fetchData();
//     }, []);
  
//     const addToCart =(itemId) =>{
//         setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
//         console.log(cartItems);
//     } 

//     const removeFromCart =(itemId)=>{
//         setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
//     }

//     const getTotalCartAmount = () => {
//       let totalAmount = 0;
//       for (const item in cartItems) {
//         if (cartItems[item] > 0) {
//           let itemInfo = all_product.find((product) => product.id === Number(item));
//           if (itemInfo) {
//             totalAmount += itemInfo.price * cartItems[item];
//           }
//         }
//       }
//       return totalAmount.toFixed(2); 
//     };

//     const getTotalCartItems=()=>{
//       let totalItem=0;
//       for(const item in cartItems){
//         if(cartItems[item]>0){
//           totalItem+=cartItems[item];
//         }
//       }
//       return totalItem;
//     }
    
//     const contextValue = { all_product, cartItems,addToCart,removeFromCart,getTotalCartAmount,getTotalCartItems };
  
//     return (
//       <ShopContext.Provider value={contextValue}>
//         {props.children}
//       </ShopContext.Provider>
//     );
//   };
  
//   export default ShopContextProvider;

import React, { createContext, useEffect, useState } from 'react';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [all_product, setAllProduct] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const userId = localStorage.getItem("userId") || "guest";

    const getDefaultCart = (products) => {
        let cart = {};
        products.forEach((product) => {
            cart[product.id] = 0;
        });
        return cart;
    };

    useEffect(() => {
        const fetchData = async () => {
            const url = `https://fakestoreapi.com/products`;
            const response = await fetch(url);
            const data = await response.json();
            setAllProduct(data);
            
            const storedCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || getDefaultCart(data);
            setCartItems(storedCart);
        };
        fetchData();
    }, [userId]);

    const updateLocalStorage = (updatedCart) => {
        localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
    };

    const addToCart = (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
            updateLocalStorage(updatedCart);
            return updatedCart;
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            if (updatedCart[itemId] > 1) {
                updatedCart[itemId] -= 1;
            } else {
                delete updatedCart[itemId];
            }
            updateLocalStorage(updatedCart);
            return updatedCart;
        });
    };

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

    // const getTotalCartItems = () => {
    //     return Object.values(cartItems).reduce((acc, quantity) => acc + quantity, 0);
    // };

    const getTotalCartItems=()=>{
            let totalItem=0;
            for(const item in cartItems){
              if(cartItems[item]>0){
                totalItem+=cartItems[item];
              }
            }
            return totalItem;
          }

    const contextValue = { all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
