import React, { useState, useEffect } from 'react';

// Timestamp
function getUtcSecondsSinceEpoch() {
  const now = new Date();
  const utcMilllisecondsSinceEpoch =
    now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const utcSecondsSinceEpoch = Math.round(utcMilllisecondsSinceEpoch / 1000);
  return utcSecondsSinceEpoch;
}

function Home(props) {
  const [connectionID, setConnectionID] = useState('disconnnected');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    props.socket.on('connect', () => {
      props.socket.on('welcome from server', (payload) => console.log(payload));
      props.socket.on('messages from server', (payload) => {
        setMessages(payload['db_messages']);
        console.log(typeof payload['db_messages']);
        console.log(payload['db_messages']);
      });
      props.socket.emit('connect event', { data: 'I am connected' });
      props.socket.emit('load all messages');
      console.log(props.socket.id);
      setConnectionID(props.socket.id);
    });
    return function cleanup() {
      props.socket.off('welcome from server');
      props.socket.off('messages from server');
      props.socket.off('connect');
    };
  }, []);

  return (
    <div className='Form'>
      <h1>{connectionID}</h1>
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
            timeStamp: getUtcSecondsSinceEpoch(),
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
              <h4>{message.timeStamp}</h4>
              {message.message}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default Home;
