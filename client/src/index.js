import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useOutletContext,
} from 'react-router-dom';
import './index.css';
import App from './App';

import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Register from './pages/Register';



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route
            path='/'
            element={<PrivateRoute element={<Home/>} />}
          />
          <Route
            path='login'
            element={<PublicRoute element={<Login />} restricted={true} />}
          />
          <Route
            path='register'
            element={<PublicRoute element={<Register />} restricted={true} />}
          />
          <Route path='*' element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

function PublicRoute(props) {
  const [isLoggedIn, setIsLoggedIn] = useOutletContext();
  if (isLoggedIn && props.restricted) {
    return <Navigate to='../' replace={true} />;
  } else {
    return props.element;
  }
}

function PrivateRoute(props) {
  const [isLoggedIn, setIsLoggedIn] = useOutletContext();
  if (isLoggedIn) {
    return props.element;
  } else {
    return <Navigate to='../login' replace={true} />;
  }
}
