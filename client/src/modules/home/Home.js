
import Navbar from 'modules/home/RoomsNavbar';
import Messages from 'modules/home/Messages';
import NewMessageForm from 'modules/home/NewMessageForm';
import { useContextManager } from 'modules/common/utilities';
import {
  useMessages,
  useRooms,
  useSocketIOSubscription,
} from 'modules/home/helpers';

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
      <Navbar
        currentRoom={currentRoom}
        setIsLoggedIn={setIsLoggedIn}
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
