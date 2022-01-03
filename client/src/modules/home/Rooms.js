import Messages from 'modules/home/Messages';
import NewMessageInput from 'modules/home/NewMessageInput';

function Rooms(props) {
  return (
    <div>
      <NewMessageInput socket={props.socket} />
      <Messages messages={props.messages} />
    </div>
  );
}

export default Rooms;
