import React, { useReducer, useEffect } from 'react';
import LogOutButton from '../components/LogOutButton';
import Messages from '../components/Messages';
// Timestamp

function Home(props) {
  const [messages, dispatch] = useReducer(updateMessages, []);
  function updateMessages(messages, action) {
    switch (action.type) {
      case 'CLEAR_MESSAGES':
        return;
      case 'NEW_MESSAGE':
        return [...messages, action.data];
      case 'ALL_MESSAGES':
        console.log(action.data);
        console.log(typeof action.data);
        return action.data;
    }
  }
  useEffect(() => {
    props.socket.on('connect');
    props.socket.emit('load all messages', (payload) => {
      dispatch({ type: 'ALL_MESSAGES', data: payload['db_messages'] });
    });
    props.socket.on('message from server', (payload) => {
      dispatch({ type: 'NEW_MESSAGE', data: payload['db_message'] });
    });
    return function cleanup() {
      props.socket.off('message from server');
      props.socket.off('connect');
    };
  }, []);

  return (
    <div className='Form'>
      <LogOutButton />
      <Messages messages={messages} socket={props.socket} />
    </div>
  );
}

export default Home;
