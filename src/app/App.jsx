import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header/header.jsx';
import MainPage from './components/mainPage/mainPage.jsx';
import './application.scss';

function App() {
  // TODO get user based on login
  const [user, setUser] = React.useState('test');
  return (
    <div id="app">
      <Header />

      <MainPage user={user}/>
    </div>
  );
}

export default App;
