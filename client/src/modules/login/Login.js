/** @jsxImportSource @emotion/react */
import { useRedirector, useContextManager } from 'modules/common/utilities';
import axios from 'axios';
import { css } from '@emotion/react';

function loginUser(data, redirect, setIsLoggedIn) {
  axios.post('../api/login', data).then((response) => {
    if (response.data !== 'logged in ') {
      console.log(response);
    } else {
      setIsLoggedIn(true);
      redirect('../', { replace: true });
    }
  });
}

function Login() {
  const { setIsLoggedIn } = useContextManager();
  const redirect = useRedirector();

  return (
    <div css={formWrapper}>
      <form
        css={form}
        onSubmit={(e) => {
          e.preventDefault();
          const data = {
            username: e.target.username.value,
            password: e.target.password.value,
            remember: e.target.remember.value,
          };
          loginUser(data, redirect, setIsLoggedIn);
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
          <div css={rememberMeWrapper}>
            <label css={rememberLabel}>Remember Me</label>
            <input css={remember} type='checkbox' name='remember' />
          </div>
        </div>
        <button css={primaryButton}>Login</button>
        <button
          css={secondaryButton}
          onClick={() => redirect('../register', { replace: true })}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Login;

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

const secondaryButton = css`
  margin: auto;
  width: 100%;
  height: 50px;
  background: hsl(225, 100%, 94%);
  color: #000;
  border-radius: 25px;
  font-weight: 500;
  font-size: 1rem;
  border: none;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
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
  width: 80%;
`;

const rememberLabel = css`
  margin: auto 1ch auto 0;
  width: fit-content;
`;
const remember = css`
  margin: auto 0;
  width: fit-content;
`;

const rememberMeWrapper = css`
  display: flex;
  width: 80%;
  margin: auto;
`;
