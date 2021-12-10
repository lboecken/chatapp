import React from 'react';
import { Outlet } from 'react-router';
import './App.css';
import axios from 'axios';

function App() {
  const logout = () => {
    sessionStorage.clear();
    axios.get('../api/logout');
  };
  return (
    <div className='App'>
      <h1>Chat App</h1>
      <form onSubmit={logout}>
        <button type='submit'>Logout</button>
      </form>
      <Outlet />
    </div>
  );
}

export default App;
