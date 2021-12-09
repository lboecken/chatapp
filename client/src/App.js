import React, { useState } from 'react';
import { Outlet } from 'react-router';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const updateLogin = () => {
    if (isLoggedIn) {
      localStorage.clear();
      setIsLoggedIn(false);
    } else {
      localStorage.setItem('TEST_TOKEN', 'authUser');
      setIsLoggedIn(true);
    }
  };
  return (
    <div className='App'>
      <h1>Chat App</h1>
      <button onClick={updateLogin}>Login/Logout</button>
      <p>{isLoggedIn ? 'logged in' : 'logged out'}</p>
      <Outlet />
    </div>
  );
}

export default App;
