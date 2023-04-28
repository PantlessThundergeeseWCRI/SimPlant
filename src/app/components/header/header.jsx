import React from 'react';
import { Link } from 'react-router-dom';
import './headerStyle.scss';

function Header(props) {
  
  const handleClick = async() => {
    console.log(props.user);
    const response = await fetch(`http://localhost:3000/users/logout/${props.user}`, {
      method: 'DELETE'
    });
    if(response){
      props.setLoggedIn(false);
    }
  }

  return (
    <header id="header">
      <Link to="/">
        <h1>SimPlant</h1>
      </Link>
      {props.user ? 
        <nav>
          <Link className='logout' to="/" onClick={handleClick}>
            Logout
          </Link>
        </nav> : null}
      
    </header>
  );
}

export default Header;
