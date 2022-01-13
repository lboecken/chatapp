import { useOutletContext, useNavigate } from 'react-router-dom';

export function useRedirector() {
  const navigate = useNavigate();
  return navigate;
}

export function useContextManager() {
  const { isLoggedIn, setIsLoggedIn, socket, userName } = useOutletContext();
  return {
    isLoggedIn: isLoggedIn,
    setIsLoggedIn: setIsLoggedIn,
    socket: socket,
    userName: userName,
  };
}
