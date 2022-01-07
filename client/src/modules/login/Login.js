import { useRedirector, useContextManager } from 'modules/common/utilities';
import axios from 'axios';
import Button from 'modules/common/Button';
import Input from 'modules/common/Input';

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
        onSubmit={(e) => {
          e.preventDefault();
          const data = {
            username: e.target.username.value,
            password: e.target.password.value,
            remember: e.target.remember.value,
          };
          loginUser(data, redirect, setIsLoggedIn);
        }}>
        <Input
          label='Username:'
          attributes={{ type: 'text', name: 'username' }}
        />
        <Input
          label='Password:'
          attributes={{ type: 'password', name: 'password' }}
        />
        <Input
          label='Remember Me'
          attributes={{ type: 'checkbox', name: 'remember' }}
        />
        <Button text='Login' />
        <Button
          text='Register'
          attributes={{
            onClick: () => redirect('../register', { replace: true }),
          }}
        />
      </form>
    </div>
  );
}

export default Login;
