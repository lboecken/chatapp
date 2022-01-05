import React from 'react';
import axios from 'axios';
import RoomsNavbar from 'modules/home/RoomsNavbar';
import Messages from 'modules/home/Messages';
import NewMessageForm from 'modules/home/NewMessageForm';
import Button from 'modules/common/Button';
import {
  useMessagesManager,
  useRooms,
  useRoomUpdater,
  useSocketIOSubscription,
} from 'modules/home/helpers';
import { useContextManager } from 'helpers';

function Home() {
  const { setIsLoggedIn, socket } = useContextManager();
  const [currentRoom, setCurrentRoom] = useRooms();
  const [messages, dispatch] = useMessagesManager();

  useSocketIOSubscription(socket, dispatch);
  useRoomUpdater(socket, dispatch, currentRoom);

  const LogoutButtonContext = {
    text: 'Logout',
    attributes: {
      class: 'primaryButton logoutButton',
      onClick: function Logout() {
        setIsLoggedIn(false);
        axios.post('../api/logout');
        console.log('log out ran');
      },
    },
  };

  return (
    <div>
      <Button context={LogoutButtonContext} />
      <RoomsNavbar currentRoom={currentRoom} setCurrentRoom={setCurrentRoom} />
      <NewMessageForm socket={socket} />
      <Messages messages={messages} />
    </div>
  );
}

export default Home;

function GenericForm() {
  return (
    <form>
      <Input />
      <Input />
      <Input />
      <Input />
      <Button />
    </form>
  );
}
