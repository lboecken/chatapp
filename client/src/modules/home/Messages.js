import { useContextManager } from 'modules/common/utilities';
import 'modules/home/Messages.css';

function Messages({ messages }) {
  const { userName } = useContextManager();
  return (
    <div className='MessagesContainer'>
      <ul className='Messages'>
        {messages.map((message) => {
          return (
            <li
              className={
                ifSelf(userName, message.userName)
                  ? 'selfMessage'
                  : 'otherMessage'
              }
              key={message.timestamp + '_' + message.userName}>
              <h4>{message.userName}</h4>
              {message.message}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Messages;

function ifSelf(currentUserName, messageUserName) {
  console.log(currentUserName, messageUserName);
  if (currentUserName === messageUserName) return true;
  return false;
}
