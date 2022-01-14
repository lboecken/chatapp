import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

function sendMessageToServer(socket, newMessage) {
  socket.emit('new-message', {
    message: newMessage,
    timeStamp: getUtcSecondsSinceEpoch(),
  });
}

function getUtcSecondsSinceEpoch() {
  const now = new Date();
  const utcMilllisecondsSinceEpoch = now.getTime();
  const utcSecondsSinceEpoch = Math.round(utcMilllisecondsSinceEpoch / 1000);
  return utcSecondsSinceEpoch;
}

function NewMessageForm({ socket, newMessage, setNewMessage }) {
  return (
    <div className='NewMessageForm'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessageToServer(socket, newMessage);
        }}>
        <input
          placeholder='enter your message here'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
}

export default NewMessageForm;
