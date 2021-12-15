import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import LogOutButton from './components/LogOutButton';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className='App'>
      <h1>Chat App</h1>
      <Outlet context={[isLoggedIn, setIsLoggedIn]} />
    </div>
  );
}

export default App;
