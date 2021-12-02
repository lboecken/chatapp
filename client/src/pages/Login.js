import React from 'react';

function Login() {
  return (
    <div>
      <form>
        <label>Username:</label>
        <input type='text'></input>
        <label>Password:</label>
        <input type='text'></input>
        <button type='submit'>Login</button>
        <button type='button'>Register</button>
      </form>
    </div>
  );
}

export default Login;

// TODO react forms
