import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';

export function useRooms() {
  const [currentRoom, setCurrentRoom] = useState('default');
  return [currentRoom, setCurrentRoom];
}

export function useSocketIOSubscription(socket, dispatch) {
  useEffect(() => {
    socket.on('message-from-server', (payload) => {
      dispatch({ type: 'NEW_MESSAGE', data: payload['db_message'] });
    });
    return function cleanup() {
      socket.off('message-from-server');
    };
  }, []);
}

export function useRoomUpdater(socket, dispatch, currentRoom) {
  useEffect(() => {
    dispatch({ type: 'CLEAR_MESSAGES', data: [] });
    socket.emit('update-room', { roomName: currentRoom }, (payload) => {
      console.log(payload);
      socket.emit('load-all-messages', (payload) => {
        dispatch({ type: 'ALL_MESSAGES', data: payload['db_messages'] });
        console.log(payload);
      });
    });
  }, [currentRoom]);
}

export function useMessagesManager() {
  const [messages, dispatch] = useReducer(updateMessages, []);
  return [messages, dispatch];
}

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

export function getPossibleRooms() {
  axios('./api/get-possible-rooms').then((response) => {
    console.log(response['data']);
    return response['data'];
  });
}

export function getUtcSecondsSinceEpoch() {
  const now = new Date();
  const utcMilllisecondsSinceEpoch = now.getTime();
  const utcSecondsSinceEpoch = Math.round(utcMilllisecondsSinceEpoch / 1000);
  return utcSecondsSinceEpoch;
}
