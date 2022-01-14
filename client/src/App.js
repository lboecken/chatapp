/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useRedirector } from 'modules/common/utilities';
import io from 'socket.io-client';
import axios from 'axios';
import { Global, css } from '@emotion/react';
import Logo from 'modules/icons/code-break.svg';

function App() {
  const [isLoggedIn, setIsLoggedIn, userName, setUserName] = useLoginManager();
  useSessionValidator(setIsLoggedIn, setUserName);
  return (
    <div>
      <Global
        styles={css`
          @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@500;700;900&display=swap');
          body {
            margin: 0px;
            padding: 0px;
            box-sizing: border-box;
            font-family: 'Red Hat Display', sans-serif;
            background-color: hsl(225, 100%, 94%);
          }
        `}
      />
      <div css={titleWrapper}>
        <h1 css={title}>ChatApp</h1>
        <img src={Logo} alt='Icon' css={titleLogo} />
      </div>
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

const titleLogo = css`
  width: auto;
  height: 4.5rem;
  margin: auto 0;
`;

const titleWrapper = css`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;
const title = css`
  font-weight: 900;
  font-size: 3rem;
  text-align: center;
`;
