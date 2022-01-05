import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContextManager } from 'helpers';

function Login() {
  const { setIsLoggedIn } = useContextManager();
  const navigate = useNavigate();
  const loginUser = (data) => {
    axios.post('../api/login', data).then((response) => {
      if (response.data !== 'logged in ') {
      } else {
        setIsLoggedIn(true);
        navigate('../', { replace: true });
      }
    });
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = {
            username: e.target.username.value,
            password: e.target.password.value,
            remember: true,
          };
          loginUser(data);
        }}>
        <label>Username:</label>
        <input type='text' name='username'></input>
        <label>Password:</label>
        <input type='text' name='password'></input>
        <button type='submit'>Login</button>
        <button
          type='button'
          onClick={() => {
            navigate('../register', { replace: true });
          }}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Login;
