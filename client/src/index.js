import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';

import SocketTest from './SocketTest';
import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Register from './pages/Register';

const { io } = require('socket.io-client');
const socket = io();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='' element={<Home />} />
          <Route path='test' element={<SocketTest socket={socket} />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='*' element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
