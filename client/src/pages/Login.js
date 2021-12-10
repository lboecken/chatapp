import React from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import '../utilities/Login';
import { isLogin } from '../utilities/Login';
function Login() {
  const loginUser = (formUsername, formPassword) => {
    axios
      .post('../api/login', {
        username: formUsername,
        password: formPassword,
      })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        if (response.data !== 'logged in ') {
          console.log('you are not logged in');
        } else {
          sessionStorage.setItem('TEST_TOKEN', 'authUser');
        }
      });
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const username = e.target.username.value;
          const password = e.target.password.value;
          loginUser(username, password);
        }}>
        <label>Username:</label>
        <input type='text' name='username'></input>
        <label>Password:</label>
        <input type='text' name='password'></input>
        <button type='submit'>Login</button>
        <button type='button'>Register</button>
      </form>
    </div>
  );
}

export default Login;

// TODO react forms
