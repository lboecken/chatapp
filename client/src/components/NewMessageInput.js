import { useState } from 'react';
import { getUtcSecondsSinceEpoch } from '../helpers';

function NewMessageInput(props) {
  const [newMessage, setNewMessage] = useState();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.socket.emit('new message', {
          message: newMessage,
          timeStamp: getUtcSecondsSinceEpoch(),
        });
      }}>
      <input
        placeholder='enter your message here'
        value={newMessage}
        onChange={(e) => {
          setNewMessage(e.target.value);
        }}></input>
      <input type='submit' />
    </form>
  );
}

export default NewMessageInput;
