import Messages from '../components/Messages';
import NewMessageInput from '../components/NewMessageInput';

function Rooms(props) {
  return (
    <div>
      <NewMessageInput socket={props.socket} />
      <Messages messages={props.messages} />
    </div>
  );
}

export default Rooms;
