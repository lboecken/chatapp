import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';

export function useRooms() {
  const [currentRoom, setCurrentRoom] = useState('default');
  return [currentRoom, setCurrentRoom];
}

export function useSocketIOSubscription(socket, dispatch) {
  useEffect(() => {
    socket.connect();
    socket.on('message-from-server', (payload) => {
      dispatch({ type: 'NEW_MESSAGE', data: payload['db_message'] });
    });
    return function cleanup() {
      socket.off('message-from-server');
      socket.disconnect();
    };
  }, []);
}

export function useRoomUpdater(socket, dispatch, currentRoom) {
  useEffect(() => {
    dispatch({ type: 'CLEAR_MESSAGES', data: [] });
    socket.emit('update-room', { roomName: currentRoom }, (payload) => {
      socket.emit('load-all-messages', (payload) => {
        dispatch({ type: 'ALL_MESSAGES', data: payload['db_messages'] });
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

export async function useRoomsManager() {
  const [currentRoom, setCurrentRoom] = useState('default');
  const possibleRooms = await getPossibleRooms();

  return {
    proto_possibleRooms: possibleRooms['data'],
    proto_currentRoom: currentRoom,
    proto_setCurrentRoom: setCurrentRoom,
  };
}

async function getPossibleRooms() {
  const response = await axios.get('./api/get-possible-rooms');
  return response;
}

export function getUtcSecondsSinceEpoch() {
  const now = new Date();
  const utcMilllisecondsSinceEpoch = now.getTime();
  const utcSecondsSinceEpoch = Math.round(utcMilllisecondsSinceEpoch / 1000);
  return utcSecondsSinceEpoch;
}
