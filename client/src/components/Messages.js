import { useState } from 'react';
import { getUtcSecondsSinceEpoch } from '../helpers';
function Messages(props) {
  const [newMessage, setNewMessage] = useState();
  return (
    <div>
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
      <ul>
        {props.messages.map((message) => {
          return (
            <li>
              <h4>{message.userID}</h4>
              {message.message}
              <hr />
              {message.timeStamp}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Messages;
