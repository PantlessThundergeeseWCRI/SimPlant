import React, { useRef } from 'react';
import { Link } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import './LoginStyle.scss';

export default function Login(props) {
  const username = useRef();
  const password = useRef();
  
  const userLogin = async credentials => {
    // fetch call to validate user
    const data = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    return data.ok;
  }
  
  const handleClick = async () => {
    const result = await userLogin({
        username: username.current.value,
        password: password.current.value
    });
    // if result is true (verified user), set loggedIn to true
    if (result) {
      props.setLoggedIn(true);
      props.setUser(username.current.value);
    }
  }

  return (
    <div className='loginPage'>
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse.credential);
          const decoded = jwt_decode(credentialResponse.credential);
          console.log(decoded);
          props.setLoggedIn(true);
          // to add below: fetch call to server to store decoded.sub (google user's internal id) in cookie or database to preserve session
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
      {/* database user */}
      <input ref={username} id="username" placeholder="Username"></input>
      <input ref={password} id="password" placeholder="Password"></input>
      <div>
          <button onClick={handleClick}>Login</button>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
      </div>
    </div>
  )
}