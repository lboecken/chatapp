import { useOutletContext, Navigate } from 'react-router-dom';

export function useContextManager() {
  const { isLoggedIn, setIsLoggedIn, socket } = useOutletContext();
  return {
    isLoggedIn: isLoggedIn,
    setIsLoggedIn: setIsLoggedIn,
    socket: socket,
  };
}

export function PublicRoute({ restricted, element }) {
  const { isLoggedIn } = useContextManager();
  if (isLoggedIn && restricted) {
    return <Navigate to='../' replace={true} />;
  } else {
    return element;
  }
}

export function PrivateRoute({ element }) {
  const { isLoggedIn } = useContextManager();
  if (isLoggedIn) {
    return element;
  } else {
    return <Navigate to='../login' replace={true} />;
  }
}
