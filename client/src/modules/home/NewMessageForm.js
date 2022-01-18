/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
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
    <div>
      <form
        css={form}
        onSubmit={(e) => {
          e.preventDefault();
          sendMessageToServer(socket, newMessage);
        }}>
        <input
          css={input}
          placeholder='enter your message here'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button css={button}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
}

export default NewMessageForm;

const form = css`
  display: flex;
  gap: 0.5rem;
  margin: 0.5rem;
  align-items: center;
`;

const input = css`
  width: 100%;
  flex: 5;
  background: hsl(225, 100%, 94%);
  border-radius: 1rem;
  border: none;
  height: 2rem;
  font-family: 'Red Hat Display', sans-serif;
`;

const button = css`
  flex: 1;
  max-width: 2rem;
  height: 2rem;
  border-radius: 1.5rem;
  background: hsl(245, 75%, 52%);
  border: none;
  cursor: pointer;
`;
