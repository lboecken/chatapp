import React from 'react';

function Register() {
  return (
    <div>
      <form>
        <label>Name</label>
        <input type='text' placeholder='name' />
        <label>Email</label>
        <input type='text' placeholder='Email' />
        <label>Password</label>
        <input type='text' placeholder='Password' />
        <label>Confirm Password</label>
        <input type='text' placeholder='Confirm Password' />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default Register;
