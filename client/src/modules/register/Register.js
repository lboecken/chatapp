import { useRedirector } from 'modules/common/utilities';
import Button from 'modules/common/Button';
import FormInput from 'modules/common/FormInput';
import axios from 'axios';
import 'modules/register/Register.css';

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
        className='RegisterForm'
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
        <FormInput
          label='Username'
          labelAttributes={{ className: 'registerFormLabel' }}
          inputAttributes={{ type: 'text', name: 'username' }}
        />
        <FormInput
          label='Password'
          labelAttributes={{ className: 'registerFormLabel' }}
          inputAttributes={{ type: 'text', name: 'password' }}
        />
        <FormInput
          label='Confirm Password'
          labelAttributes={{ className: 'registerFormLabel' }}
          inputAttributes={{ type: 'text', name: 'confirmPassword' }}
        />
        <Button attributes={{ type: 'submit' }} text='Register' />
      </form>
    </div>
  );
}

export default Register;
