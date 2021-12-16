import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';
const { io } = require('socket.io-client');
const socket = io();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios.post('../api/validate-previous-session').then((response) => {
      if (response['data'] == 'valid') {
        setIsLoggedIn(true);
        navigate('../', { replace: true });
      }
    });
  }, []);
  return (
    <div className='App'>
      <h1>Chat App</h1>
      <Outlet context={[isLoggedIn, setIsLoggedIn, socket]} />
    </div>
  );
}

export default App;
