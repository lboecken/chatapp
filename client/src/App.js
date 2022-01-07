import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useRedirector } from 'modules/common/utilities';
import './App.css';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io({ autoConnect: false });

function useLoginManager() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return [isLoggedIn, setIsLoggedIn];
}

function useSessionValidator(setIsLoggedIn) {
  const redirect = useRedirector();
  useEffect(() => {
    axios.post('../api/validate-previous-session').then((response) => {
      if (response['data'] == 'valid') {
        setIsLoggedIn(true);
        redirect('../', { replace: true });
      }
    });
  }, []);
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useLoginManager();
  useSessionValidator(setIsLoggedIn);
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
