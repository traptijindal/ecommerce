import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar.jsx'
import {BrowserRouter,Routes,Route} from  'react-router-dom'
import Shop from './Pages/Shop.jsx'
import ShopCategory from './Pages/ShopCategory.jsx'
import Product from './Pages/Product.jsx'
import Cart from './Pages/Cart.jsx'
import LoginSignUp from './Pages/LoginSignUp.jsx'
import Footer from './Components/Footer/Footer.jsx'
import men_banner from "./assets/banner_mens.png"
import women_banner from "./assets/banner_women.png" 
import kids_banner from "./assets/banner_kids.png"

const App = () => {
  const[category,setCategory]=useState("");
  const[displayFooter,setDisplayFooter]=useState(true);
  return (
    <div>
      <BrowserRouter>
      <Navbar category={category} setCategory={setCategory}/>
      <Routes>
        <Route path='/'  element={<Shop/>}/>
        <Route path='/mens' element={<ShopCategory banner={men_banner} category={category}/>}/>
        <Route path='/womens' element={<ShopCategory banner={women_banner} category= {category}/>}/>
        <Route path='/electronics' element={<ShopCategory banner={kids_banner} category={category}/>}/>
        <Route path='/jewellery' element={<ShopCategory banner={kids_banner} category={category}/>}/>
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path='/login' element={< LoginSignUp setDisplayFooter={setDisplayFooter} displayFooter={displayFooter}/>}/>
      </Routes>
      </BrowserRouter>
      {displayFooter && <Footer />}
    </div>
  )
}

export default App
