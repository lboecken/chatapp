import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useRedirector } from 'modules/common/utilities';
import './App.css';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io({ autoConnect: false });

function useLoginManager() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState();
  return [isLoggedIn, setIsLoggedIn, userName, setUserName];
}

function useSessionValidator(setIsLoggedIn, setUserName) {
  const redirect = useRedirector();
  useEffect(() => {
    axios.post('../api/validate-previous-session').then((response) => {
      if (response['data']['status'] === 'valid') {
        setIsLoggedIn(true);
        setUserName(response['data']['userName']);
        redirect('../', { replace: true });
      }
    });
  }, [setIsLoggedIn, redirect]);
}

function App() {
  const [isLoggedIn, setIsLoggedIn, userName, setUserName] = useLoginManager();
  useSessionValidator(setIsLoggedIn, setUserName);
  return (
    <div className='App'>
      <Outlet
        context={{
          isLoggedIn: isLoggedIn,
          setIsLoggedIn: setIsLoggedIn,
          socket: socket,
          userName: userName,
        }}
      />
    </div>
  );
}

export default App;
