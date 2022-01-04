import Messages from 'modules/home/Messages';
import NewMessageInput from 'modules/home/NewMessageInput';

function Rooms({ context }) {
  const { messages, socket } = context;
  return (
    <div>
      <NewMessageInput socket={socket} />
      <Messages messages={messages} />
    </div>
  );
}

export default Rooms;
