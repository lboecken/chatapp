import React, { useReducer, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import LogOutButton from '../components/LogOutButton';
import Rooms from '../components/Rooms';
import RoomsNavbar from '../components/RoomsNavbar';

function Home() {
  const [isLoggedIn, setIsLoggedIn, socket] = useOutletContext();
  const [currentRoom, setCurrentRoom] = useState('default');
  const [messages, dispatch] = useReducer(updateMessages, []);
  function updateMessages(messages, action) {
    switch (action.type) {
      case 'CLEAR_MESSAGES':
        return action.data;
      case 'NEW_MESSAGE':
        return [action.data, ...messages];
      case 'ALL_MESSAGES':
        return action.data;
    }
  }
  useEffect(() => {
    socket.on('connect');
    socket.on('message from server', (payload) => {
      dispatch({ type: 'NEW_MESSAGE', data: payload['db_message'] });
    });
    return function cleanup() {
      socket.off('message from server');
      socket.off('connect');
    };
  }, []);

  useEffect(() => {
    dispatch({ type: 'CLEAR_MESSAGES', data: [] });
    socket.emit('update room', { roomName: currentRoom }, (payload) => {
      console.log(payload);
      socket.emit('load all messages', (payload) => {
        dispatch({ type: 'ALL_MESSAGES', data: payload['db_messages'] });
        console.log(payload);
      });
    });
  }, [currentRoom]);

  return (
    <div>
      <LogOutButton />
      <RoomsNavbar setCurrentRoom={setCurrentRoom} socket={socket} />
      <h1>{currentRoom}</h1>
      <Rooms messages={messages} name={currentRoom} socket={socket} />
    </div>
  );
}

export default Home;
