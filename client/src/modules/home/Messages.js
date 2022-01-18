/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import NewMessageForm from 'modules/home/NewMessageForm';
import AllMessagesContainer from 'modules/home/AllMessagesContainer';

function Messages({ messages, socket, setNewMessage, newMessage }) {
  return (
    <div css={messagesOuterContainer}>
      <AllMessagesContainer messages={messages} />
      <NewMessageForm
        socket={socket}
        setNewMessage={setNewMessage}
        newMessage={newMessage}
      />
    </div>
  );
}

export default Messages;

const messagesOuterContainer = css`
  margin: auto;
  max-width: 750px;
  min-width: 350px;
  background: hsl(224, 23%, 55%);
  border-radius: 1rem;
`;
