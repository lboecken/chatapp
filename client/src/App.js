/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react';
import axios from 'axios';
import Header from 'modules/common/Header';
import { useRedirector } from 'modules/common/utilities';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import io from 'socket.io-client';

function App() {
  const [isLoggedIn, setIsLoggedIn, userName, setUserName] = useLoginManager();
  useSessionValidator(setIsLoggedIn, setUserName);
  const appContext = {
    isLoggedIn: isLoggedIn,
    setIsLoggedIn: setIsLoggedIn,
    socket: socket,
    userName: userName,
  };
  return (
    <div>
      <Global styles={globalStyling} />
      <div css={pageWrapper}>
        <Header />
        <Outlet context={appContext} />
      </div>
    </div>
  );
}

export default App;

const socket = io({ autoConnect: false });

const useLoginManager = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState();
  return [isLoggedIn, setIsLoggedIn, userName, setUserName];
};

const useSessionValidator = (setIsLoggedIn, setUserName) => {
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
};

const globalStyling = css`
  @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@500;700;900&display=swap');
  body {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    font-family: 'Red Hat Display', sans-serif;
    background-color: hsl(225, 100%, 94%);
  }
`;

const pageWrapper = css`
  max-height: 100vh;
`;
