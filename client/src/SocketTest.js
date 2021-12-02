import React, { useState, useEffect } from 'react';

function SocketTest(props) {
  const [connectionID, setConnectionID] = useState('disconnnected');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    props.socket.on('connect', () => {
      props.socket.emit('connect event', { data: 'I am connected' });
      props.socket.emit('load all messages', (payload) => {
        console.log(payload);
        setMessages(payload);
      });
      console.log(props.socket.id);
      setConnectionID(props.socket.id);
    });
  }, []);

  props.socket.on('messages from server', (payload) => {
    setMessages(payload['messages']);
  });

  props.socket.on('welcome from server', (payload) => console.log(payload));
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
          props.socket.emit('new message', { message: newMessage });
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
          return <li>{message}</li>;
        })}
      </ul>
    </div>
  );
}
export default SocketTest;
