import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/header.jsx';
import MainPage from './components/mainPage/mainPage.jsx';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import './application.scss';

function App() {
  // TODO get user based on login
  const [user, setUser] = React.useState('test');
  const [loggedIn, setLoggedIn] = useState();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={
          // (() => {
          //   // if user is not logged in, load Login component to require login
          //   if (!loggedIn) {
          //     return (
          //       <>
          //         <Header />
          //         <Login setLoggedIn={setLoggedIn} />
          //       </>
          //     )
          //   } else {
          //     // if user is logged in, display homepage
          //     return (
          //       <div id="app">
          //         <Header />
          //         <MainPage />
          //       </div>
          //     );
          //   }
          // })()
          <div id="app">
            <Header />
            <MainPage user={user}/>
          </div>
        } />
        <Route path="/signup" element={
          <>
            <Header />
            <Signup />
          </>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
