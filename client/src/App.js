import './App.css';
import Form from './Socket';
const { io } = require('socket.io-client');
const socket = io();

function App() {
  return (
    <div className='App'>
      <h1>Hello</h1>
      <Form socket={socket} />
    </div>
  );
}

export default App;
