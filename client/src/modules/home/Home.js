import React from 'react';
import axios from 'axios';
import Rooms from 'modules/home/Rooms';
import RoomsNavbar from 'modules/home/RoomsNavbar';
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
    class: 'primaryButton logoutButton',
    function: function Logout() {
      setIsLoggedIn(false);
      axios.post('../api/logout');
    },
  };
 
  const RoomsNavBarContext = {
    setCurrentRoom: setCurrentRoom,
    socket: socket,
    currentRoom: currentRoom,
  };

  const RoomsContext = {
    messages: messages,
    socket: socket,
  };

  return (
    <div>
      <Button context={LogoutButtonContext} />
      <RoomsNavbar context={RoomsNavBarContext} />
      <Rooms context={RoomsContext} />
    </div>
  );
}

export default Home;

function GenericForm() {
  return (
    <form>
      <Input/>
      <Input/>
      <Input/>
      <Input/>
      <Button/>
    </form>
  )
}
