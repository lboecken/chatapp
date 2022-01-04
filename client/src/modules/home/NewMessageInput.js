import { useState } from 'react';
import { getUtcSecondsSinceEpoch } from 'modules/home/helpers';
import Input from 'modules/common/Input';

function NewMessageInput(props) {
  const [newMessage, setNewMessage] = useState();
  function handleNewMessage(message) {
    setNewMessage(message);
  }
  const newMessageInputContext = {
    name: null,
    attributes: {
      placeholder: 'Type Message Here',
      value: newMessage,
      onChange: handleNewMessage,
    },
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.socket.emit('new-message', {
          message: newMessage,
          timeStamp: getUtcSecondsSinceEpoch(),
        });
      }}>
      {/* <input
        placeholder='enter your message here'
        value={newMessage}
        onChange={(e) => {
          setNewMessage(e.target.value);
        }}></input> */}
      <Input context={newMessageInputContext} />
      <button type='submit' />
    </form>
  );
}

export default NewMessageInput;
