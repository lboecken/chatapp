import { Outlet } from 'react-router';
import './App.css';

function App() {
  return (
    <div className='App'>
      <h1>Chat App</h1>
      <Outlet />
    </div>
  );
}

export default App;
