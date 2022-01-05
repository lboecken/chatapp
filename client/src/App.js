import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import { io } from 'socket.io-client';
const socket = io({ autoConnect: false });

function validatePreviousSession(setIsLoggedIn) {
  const navigate = useNavigate();
  useEffect(() => {
    axios.post('../api/validate-previous-session').then((response) => {
      if (response['data'] == 'valid') {
        setIsLoggedIn(true);
        navigate('../', { replace: true });
      }
    });
  }, []);
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  validatePreviousSession(setIsLoggedIn);
  return (
    <div className='App'>
      <h1>Chat App</h1>
      <Outlet
        context={{
          isLoggedIn: isLoggedIn,
          setIsLoggedIn: setIsLoggedIn,
          socket: socket,
        }}
      />
    </div>
  );
}

export default App;
