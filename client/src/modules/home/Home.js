import axios from 'axios';
import RoomsNavbar from 'modules/home/RoomsNavbar';
import Messages from 'modules/home/Messages';
import NewMessageForm from 'modules/home/NewMessageForm';
import Button from 'modules/common/Button';
import { useContextManager } from 'modules/common/utilities';
import {
  useMessages,
  useRooms,
  useSocketIOSubscription,
} from 'modules/home/helpers';
import 'modules/home/Home.css';

function Home() {
  const { setIsLoggedIn, socket } = useContextManager();
  const [allMessages, dispatchMessages, newMessage, setNewMessage] =
    useMessages();
  const [currentRoom, setCurrentRoom, availableRooms] = useRooms(
    dispatchMessages,
    socket
  );

  useSocketIOSubscription(dispatchMessages, socket);

  return (
    <div className='Home'>
      <Button
        attributes={{
          className: 'primaryButton logoutButton',
          onClick: function Logout() {
            setIsLoggedIn(false);
            axios.post('../api/logout');
            console.log('log out ran');
          },
        }}
        text='Logout'
      />
      <RoomsNavbar
        currentRoom={currentRoom}
        setCurrentRoom={setCurrentRoom}
        possibleRooms={availableRooms['data']}
      />
      <Messages messages={allMessages} />
      <NewMessageForm
        socket={socket}
        setNewMessage={setNewMessage}
        newMessage={newMessage}
      />
    </div>
  );
}

export default Home;
