/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Navbar from 'modules/home/Navbar';
import Messages from 'modules/home/Messages';
import CurrentRoom from 'modules/home/CurrentRoom';
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
    <div css={homeWrapper}>
      <Navbar
        currentRoom={currentRoom}
        setIsLoggedIn={setIsLoggedIn}
        setCurrentRoom={setCurrentRoom}
        possibleRooms={availableRooms['data']}
      />
      <CurrentRoom currentRoom={currentRoom} />
      <Messages
        messages={allMessages}
        socket={socket}
        setNewMessage={setNewMessage}
        newMessage={newMessage}
      />
    </div>
  );
}

export default Home;

const homeWrapper = css`
  display: flex;
  flex-direction: column;
`;
