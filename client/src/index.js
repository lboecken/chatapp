import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './App';

import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Register from './pages/Register';

import { isLogin } from './utilities/Login';

const { io } = require('socket.io-client');
const socket = io();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route
            path='/'
            element={<PrivateRoute element={<Home socket={socket} />} />}
          />
          <Route
            path='login'
            element={<PublicRoute element={<Login />} restricted={true} />}
          />
          <Route
            path='register'
            element={<PublicRoute element={<Register />} restricted={true} />}
          />
          <Route path='*' element={<NoMatch />} />
          <Route
            path='test'
            element={<PublicRoute to='../login' restricted={true} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

function PublicRoute(props) {
  if (isLogin() && props.restricted) {
    return <Navigate to='../' replace={true} />;
  } else {
    return props.element;
  }
}

function PrivateRoute(props) {
  if (isLogin()) {
    return props.element;
  } else {
    return <Navigate to='../login' replace={true} />;
  }
}
