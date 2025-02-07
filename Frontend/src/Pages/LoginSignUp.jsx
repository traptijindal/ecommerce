
// import React, {useState, useEffect } from 'react';
// import './CSS/LoginSignup.css';

// const LoginSignUp = ({setDisplayFooter}) => {
//   useEffect(() => {
//     setDisplayFooter(false);  

//     return () => {
//       setDisplayFooter(true); 
//     };
//   }, [setDisplayFooter]);


//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const[email,setEmail]=useState('');
//     const loginUser=async()=>{
//       const url =`https://fakestoreapi.com/auth/login`;
//       const response=fetchUser(url);
//       const data=await response.json();
//       const token=data.token;
//       localStorage.setItem('token', token);
//     }

//     const handleLogin = () => {
//       loginUser(username, password,email);
//     };
//   return (
//     <div className='loginsignup'>
//       <div className="loginsignup-container">
//         <h1>Login </h1>
//         <div className="loginsignup-fields">
//           <input type="text" placeholder='Your Name' onChange={(e) => setUsername(e.target.value)}/>
//           <input type="email" placeholder='Email Address' onChange={(e) => setEmail(e.target.value)}/>
//           <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
//         </div>
//         <button onClick={handleLogin}>Continue</button>
       
//         <div className="loginsignup-agree">
//           <input type="checkbox" id="agree"/>
//           <p>By continuing, I agree to the Terms of Use and Privacy Policy.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginSignUp;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/LoginSignup.css';

const Login = ({ setDisplayFooter }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setDisplayFooter(false);
    return () => setDisplayFooter(true);
  }, [setDisplayFooter]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loginUser = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', username);

      navigate('/');
      window.location.reload();
    } catch (error) {
      setError('Login failed. Please check your username and password.');
      console.error('Login Error:', error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      loginUser();
    } else {
      setError('Please enter both username and password.');
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Login</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={handleLogin}>Continue</button>
        <div className="loginsignup-agree">
          <input type="checkbox" id="agree" />
          <p>By continuing, I agree to the Terms of Use and Privacy Policy.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
