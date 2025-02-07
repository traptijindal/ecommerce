import React, { useState,useEffect, useContext, useRef } from 'react'
import './Navbar.css';
import logo from '../../assets/logo.png';
import cart_icon from "../../assets/cart_icon.png";
import { Link } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import hamburger from '../../assets/hamburger.png'; 


const Navbar = ({category,setCategory}) => {
  const [username, setUsername] = useState('');
  const {getTotalCartItems}=useContext(ShopContext);
  const[menuOpen,setIsMenuOpen]= useState(false);

  const toggleMenu=()=>{
         setIsMenuOpen(!menuOpen);
  }

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername('');
    window.location.href = '/'; 
  };

   
  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="" />
            <p>SwiftMart</p>
        </div>
       
        <ul className='nav-menu'>
        <li onClick={() => {setCategory("")}} ><Link style={{textDecoration:'none'}} to="/">Shop</Link>{category===""?<hr/>:<></>}</li>
        <li onClick={() => {setCategory("men's clothing")}} ><Link style={{textDecoration:'none'}}to="/mens">Men</Link> {category==="men's clothing"?<hr/>:<></>}</li>
       <li onClick={() => {setCategory("women's clothing")}} ><Link style={{textDecoration:'none'}}to="/womens">Women</Link> {category==="women's clothing"?<hr/>:<></>} </li>
       <li  onClick={() => {setCategory("electronics")}}  ><Link style={{textDecoration:'none'}}to="/electronics">  Electronics</Link>  {category==="electronics"?<hr/>:<></>} </li>
       <li onClick={()=>{setCategory("jewelery")}}><Link style={{textDecoration:'none'}}to="/jewellery">Jewellery</Link> {category==="jewelery"?<hr/>:<></>}</li>
        </ul>
        <img src={hamburger} alt="" className='hamburger' onClick={toggleMenu}/>
      
        <div className="nav-login-cart">
        {username ? (
        <div className="navbar-profile">
          <p>Welcome, {username}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Link to='/login'><button >Login</button></Link>
      )}
            <Link to="/cart"><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>

       
        {menuOpen && (
            <div className='navbar-resp'>
               <div className='menu-icon'>
                  <ul className='list'>
                  <li onClick={() => {setCategory("")}} ><Link style={{textDecoration:'none'}} to="/" onClick={toggleMenu}>Shop</Link>{category===""?<hr/>:<></>}</li>
                 <li onClick={() => {setCategory("men's clothing")}} ><Link style={{textDecoration:'none'}}to="/mens" onClick={toggleMenu}>Men</Link> {category==="men's clothing"?<hr/>:<></>}</li>
                 <li onClick={() => {setCategory("women's clothing")}} ><Link style={{textDecoration:'none'}}to="/womens" onClick={toggleMenu}>Women</Link> {category==="women's clothing"?<hr/>:<></>} </li>
                  <li  onClick={() => {setCategory("electronics")}}  ><Link style={{textDecoration:'none'}}to="/electronics" onClick={toggleMenu}>  Electronics</Link>  {category==="electronics"?<hr/>:<></>} </li>
                 <li onClick={()=>{setCategory("jewelery")}}><Link style={{textDecoration:'none'}}to="/jewellery" onClick={toggleMenu}>Jewellery</Link> {category==="jewelery"?<hr/>:<></>}</li>
                  </ul>

                  <button>Login</button>
                  
               </div>
              </div>
        )}
    </div>
  )
}

export default Navbar
