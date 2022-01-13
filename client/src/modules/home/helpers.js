import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';

// Messages state management
export function useMessages() {
  const [newMessage, setNewMessage] = useState();
  const [allMessages, dispatchMessages] = useReducer(updateMessages, []);
  return [allMessages, dispatchMessages, newMessage, setNewMessage];
}

function updateMessages(messages, action) {
  switch (action.type) {
    case 'CLEAR_MESSAGES':
      return action.data;
    case 'NEW_MESSAGE':
      return [action.data, ...messages];
    case 'ALL_MESSAGES':
      return action.data;
    default:
  }
}

// Room state management
export function useRooms(dispatchMessages, socket) {
  const [availableRooms, setPossibleRooms] = useState([]);
  usePossibleRooms(setPossibleRooms);
  const [currentRoom, setCurrentRoom] = useState('HTML');
  useCurrentRoom(dispatchMessages, socket, currentRoom);
  return [currentRoom, setCurrentRoom, availableRooms];
}

function usePossibleRooms(setPossibleRooms) {
  useEffect(() => {
    async function fetchRooms() {
      setPossibleRooms(await getPossibleRooms());
    }
    fetchRooms();
  }, [setPossibleRooms]);
}

function useCurrentRoom(dispatchMessages, socket, currentRoom) {
  useEffect(() => {
    dispatchMessages({ type: 'CLEAR_MESSAGES', data: [] });
    socket.emit('update-room', { roomName: currentRoom }, (payload) => {
      socket.emit('load-all-messages', (payload) => {
        dispatchMessages({
          type: 'ALL_MESSAGES',
          data: payload['db_messages'],
        });
      });
    });
  }, [currentRoom, dispatchMessages, socket]);
}

async function getPossibleRooms() {
  const response = await axios.get('./api/get-possible-rooms');
  return response['data'];
}

// SocketIO state management
export function useSocketIOSubscription(dispatchMessages, socket) {
  useEffect(() => {
    socket.connect();
    socket.on('message-from-server', (payload) => {
      dispatchMessages({ type: 'NEW_MESSAGE', data: payload['db_message'] });
    });
    return function cleanup() {
      socket.off('message-from-server');
      socket.disconnect();
    };
  }, [dispatchMessages, socket]);
}
