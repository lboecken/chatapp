import { useRedirector, useContextManager } from 'modules/common/utilities';
import axios from 'axios';
import Button from 'modules/common/Button';
import FormInput from 'modules/common/FormInput';
import 'modules/login/Login.css';
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
    <div>
      <form
        className='LoginForm'
        onSubmit={(e) => {
          e.preventDefault();
          const data = {
            username: e.target.username.value,
            password: e.target.password.value,
            remember: e.target.remember.value,
          };
          loginUser(data, redirect, setIsLoggedIn);
        }}>
        <FormInput
          label='Username:'
          labelAttributes={{ className: 'loginInput' }}
          inputAttributes={{ type: 'text', name: 'username' }}
        />
        <FormInput
          label='Password:'
          labelAttributes={{ className: 'loginInput' }}
          inputAttributes={{ type: 'password', name: 'password' }}
        />
        <FormInput
          label='Remember Me'
          labelAttributes={{ className: 'loginInput' }}
          inputAttributes={{ type: 'checkbox', name: 'remember' }}
        />
        <Button text='Login' attributes={{ className: 'primaryButton' }} />
        <Button
          text='Register'
          attributes={{
            className: 'primaryButton',
            onClick: () => redirect('../register', { replace: true }),
          }}
        />
      </form>
    </div>
  );
}

export default Login;
