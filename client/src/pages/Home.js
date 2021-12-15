import React, { useReducer, useEffect, useState } from 'react';
import LogOutButton from '../components/LogOutButton';
import Room from '../components/Rooms';
import RoomsNavbar from '../components/RoomsNavbar';
const { io } = require('socket.io-client');
const socket = io();

function Home() {
  const [currentRoom, setCurrentRoom] = useState('default');
  const [messages, dispatch] = useReducer(updateMessages, []);
  function updateMessages(messages, action) {
    switch (action.type) {
      case 'CLEAR_MESSAGES':
        return;
      case 'NEW_MESSAGE':
        return [action.data, ...messages];
      case 'ALL_MESSAGES':
        return action.data;
    }
  }
  useEffect(() => {
    socket.on('connect');
    socket.emit('load all messages', (payload) => {
      dispatch({ type: 'ALL_MESSAGES', data: payload['db_messages'] });
    });
    socket.on('message from server', (payload) => {
      dispatch({ type: 'NEW_MESSAGE', data: payload['db_message'] });
    });
    return function cleanup() {
      socket.off('message from server');
      socket.off('connect');
    };
  }, []);

  return (
    <div>
      <LogOutButton />
      <RoomsNavbar setCurrentRoom={setCurrentRoom} />
      <h1>{currentRoom}</h1>
      <Room messages={messages} name='default' socket={socket} />
    </div>
  );
}

export default Home;
