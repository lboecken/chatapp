import { useOutletContext } from 'react-router-dom';
import axios from 'axios';

function LogOutButton() {
  const [isLoggedIn, setIsLoggedIn] = useOutletContext();
  if (isLoggedIn) {
    return (
      <div>
        <button
          onClick={() => {
            setIsLoggedIn(false);
            document.cookie =
              'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            axios.post('../api/logout');
          }}>
          Logout
        </button>
      </div>
    );
  } else {
    return;
  }
}

export default LogOutButton;
