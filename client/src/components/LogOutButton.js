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
