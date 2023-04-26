import React, { useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './SignupStyle.scss';

export default function Signup(props) {
  const username = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const userCreate = async credentials => {
    console.log(credentials);
    // fetch call to create user
    const data = await fetch('http://localhost:3000/users/createUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    // return status of fetch request to determine if user succesfully logged in
    return data.ok;
  }
  
  const handleClick = async () => {
    const result = await userCreate({
        username: username.current.value,
        password: password.current.value
    });
    // if user creation is successful, set loggedIn to true and navigate to '/' path
    if (result) {
      props.setLoggedIn(true);
      navigate('/');
    }
  }

  return (
    <div className="signup">
      <input ref={username} id="usernameS" placeholder="Username"></input>
      <input ref={password} id="passwordS" placeholder="Password"></input>
      <button onClick={handleClick}>Sign Up</button>
    </div>
  )
}