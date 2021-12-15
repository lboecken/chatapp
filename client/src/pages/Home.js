import React, { useState, useEffect } from 'react';
import LogOutButton from '../components/LogOutButton';

// Timestamp
function getUtcMillisecondsSinceEpoch() {
  const now = new Date();
  const utcMilllisecondsSinceEpoch = now.getTime();
  const utcSecondsSinceEpoch = Math.round(utcMilllisecondsSinceEpoch / 1000);
  return utcSecondsSinceEpoch;
}

function Home(props) {
  const [connectionID, setConnectionID] = useState('disconnnected');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    props.socket.on('connect', () => {
      console.log(props.socket.id);
      setConnectionID(props.socket.id);
    });
    props.socket.on('messages from server', (payload) => {
      setMessages(payload['db_messages']);
    });
    props.socket.emit('load all messages');
    return function cleanup() {
      props.socket.off('messages from server');
      props.socket.off('connect');
    };
  }, []);

  return (
    <div className='Form'>
      <h1>{connectionID}</h1>
      <LogOutButton />
      <Messages messages={messages} socket={props.socket} />
    </div>
  );
}

function Messages(props) {
  const [newMessage, setNewMessage] = useState();
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.socket.emit('new message', {
            message: newMessage,
            timeStamp: getUtcMillisecondsSinceEpoch(),
          });
        }}>
        <input
          placeholder='enter your message here'
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
          }}></input>
        <input type='submit' />
      </form>
      <ul>
        {props.messages.map((message) => {
          return (
            <li>
              <h4>{message.userID}</h4>
              {message.message}
              <hr />
              {message.timeStamp}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default Home;
