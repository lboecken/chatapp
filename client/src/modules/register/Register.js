import { useRedirector } from 'modules/common/utilities';
import Button from 'modules/common/Button';
import Input from 'modules/common/Input';
import axios from 'axios';

function registerNewUser(formUsername, formPassword, redirect) {
  console.log(formUsername, formPassword);
  axios
    .post('../api/register', {
      username: formUsername,
      password: formPassword,
    })
    .then((response) => {
      console.log(response);
      alert('you registered successfully');
    });
}

function doPasswordsMatch(password1, password2) {
  if (password1 === password2) {
    return true;
  }
  return false;
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
          const confirmedPassword = e.target.confirmPassword.value;
          if (doPasswordsMatch(password, confirmedPassword)) {
            registerNewUser(username, password, redirect);
            redirect('../login', { replace: true });
          } else {
            alert('The passwords do not match');
          }
        }}>
        <Input
          label='Username'
          attributes={{ type: 'text', name: 'username' }}
        />
        <Input
          label='Password'
          attributes={{ type: 'text', name: 'password' }}
        />
        <Input
          label='Confirm Password'
          attributes={{ type: 'text', name: 'confirmPassword' }}
        />
        <Button attributes={{ type: 'submit' }} text='Register' />
      </form>
    </div>
  );
}

export default Register;
