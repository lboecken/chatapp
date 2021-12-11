import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register(props) {
  const navigate = useNavigate();
  const registerNewUser = (formUsername, formPassword) => {
    console.log(formUsername, formPassword);
    axios
      .post('../api/register', {
        username: formUsername,
        password: formPassword,
      })
      .then((response) => {
        console.log(response);
        alert('you registered successfully');
        navigate('../login', { replace: true });
      });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const username = e.target.username.value;
          const password = e.target.password.value;
          registerNewUser(username, password);
        }}>
        <label>Username</label>
        <input type='text' placeholder='name' name='username' />
        <label>Password</label>
        <input type='text' placeholder='Password' name='password' />
        <label>Confirm Password</label>
        <input type='text' placeholder='Confirm Password' />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default Register;
