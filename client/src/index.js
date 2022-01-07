import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import { useContextManager } from 'modules/common/utilities';
import App from './App';
import Home from 'modules/home/Home';
import NoMatch from 'modules/nomatch/NoMatch';
import Login from 'modules/login/Login';
import Register from 'modules/register/Register';

function PublicRoute({ restricted, element }) {
  const { isLoggedIn } = useContextManager();
  if (isLoggedIn && restricted) {
    return <Navigate to='../' replace={true} />;
  } else {
    return element;
  }
}

function PrivateRoute({ element }) {
  const { isLoggedIn } = useContextManager();
  if (isLoggedIn) {
    return element;
  } else {
    return <Navigate to='../login' replace={true} />;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='/' element={<PrivateRoute element={<Home />} />} />
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
