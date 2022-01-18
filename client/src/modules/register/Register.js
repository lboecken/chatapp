/** @jsxImportSource @emotion/react */
import { useRedirector } from 'modules/common/utilities';
import axios from 'axios';
import { css } from '@emotion/react';

function Register() {
  const redirect = useRedirector();
  return (
    <div css={formWrapper}>
      <form
        css={form}
        onSubmit={(e) => {
          e.preventDefault();
          const username = e.target.username.value;
          const password = e.target.password.value;
          const confirmedPassword = e.target.confirmPassword.value;
          if (doPasswordsMatch(password, confirmedPassword)) {
            registerNewUser(username, password);
            redirect('../login', { replace: true });
          } else {
            alert('The passwords do not match');
          }
        }}>
        <div css={inputWrapper}>
          <label css={inputLabel}>
            Username
            <input css={input} type='text' name='username' />
          </label>
          <label css={inputLabel}>
            Password
            <input css={input} type='password' name='password' />
          </label>
          <label css={inputLabel}>
            Confirm Password
            <input css={input} type='password' name='confirmPassword' />
          </label>
        </div>
        <button css={primaryButton}>Register Account</button>
      </form>
    </div>
  );
}

export default Register;

function registerNewUser(formUsername, formPassword) {
  axios
    .post('../api/register', {
      username: formUsername,
      password: formPassword,
    })
    .then((response) => {
      alert('you registered successfully');
    });
}

function doPasswordsMatch(password1, password2) {
  if (password1 === password2) {
    return true;
  }
  return false;
}

const formWrapper = css`
  background: white;
  margin: auto;
  padding: 1rem;
  width: 40%;
  border-radius: 100px;
`;

const form = css`
  display: flex;
  flex-direction: column;
  background-color: white;
  gap: 1rem;
  width: 60%;
  margin: auto;
`;

const inputWrapper = css`
  background: hsl(224, 23%, 55%);
  width: 100%;
  padding: 1rem 0;
  border-radius: 25px;
`;

const inputLabel = css`
  display: block;
  margin: 1ch auto;
  width: 80%;
`;

const input = css`
  display: block;
  margin: auto;
  padding: 0;
  width: 80%;
`;

const primaryButton = css`
  margin: auto;
  width: 100%;
  height: 50px;
  background: hsl(223, 47%, 23%);
  color: #fff;
  border-radius: 25px;
  font-weight: 500;
  font-size: 1rem;
  border: none;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
