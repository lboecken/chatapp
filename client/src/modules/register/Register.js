import { useRedirector } from 'modules/common/utilities';
import Button from 'modules/common/Button';
import Input from 'modules/common/Input';
import axios from 'axios';

export function registerNewUser(formUsername, formPassword, redirect) {
  console.log(formUsername, formPassword);
  axios
    .post('../api/register', {
      username: formUsername,
      password: formPassword,
    })
    .then((response) => {
      console.log(response);
      alert('you registered successfully');
      redirect('../login', { replace: true });
    });
}

function Register() {
  const redirect = useRedirector();
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const username = e.target.username.value;
          const password = e.target.password.value;
          registerNewUser(username, password, redirect);
        }}>
        <Input
          label='Username'
          attributes={{ type: 'text', name: 'username' }}
        />
        <Input
          label='Password'
          attributes={{ type: 'text', name: 'password' }}
        />
        <Input label='Confirm Password' attributes={{ type: 'text' }} />
        <Button attributes={{ type: 'submit' }} text='Register' />
      </form>
    </div>
  );
}

export default Register;
