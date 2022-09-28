/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useContextManager } from 'modules/common/utilities';
import { useRef, useEffect } from 'react';

function AllMessagesContainer({ messages }) {
  const { userName } = useContextManager();
  const scrollingDiv = useAutoScroller(messages);
  return (
    <div css={messagesInnerContainer} ref={scrollingDiv}>
      {messages.map((message) => {
        return (
          <div
            css={ifSelf(userName, message.userName) ? ownMessage : otherMessage}
            key={message.id}>
            <h4>{message.userName}</h4>
            <p>{message.message}</p>
          </div>
        );
      })}
    </div>
  );
}
export default AllMessagesContainer;

function useAutoScroller(messages) {
  const parentDiv = useRef(null);
  const isPageLoaded = useRef(true);
  const wereMessagesScrolledToBottomOnLoad = useRef(false);
  useEffect(() => {
    if (pixelsFromBottom(parentDiv) < 150) {
      parentDiv.current.scrollTop = 9999999;
      isPageLoaded.current = 'yes';
      return;
    }
    if (isPageLoaded && !wereMessagesScrolledToBottomOnLoad.current) {
      parentDiv.current.scrollTop = 9999999;
      wereMessagesScrolledToBottomOnLoad.current = true;
    }
  }, [messages]);

  return parentDiv;
}

function pixelsFromBottom(parentDiv) {
  const scrollHeight = parentDiv.current.scrollHeight;
  const clientHeight = parentDiv.current.clientHeight;
  const scrollTop = parentDiv.current.scrollTop;
  const pixelsFromBottom = scrollHeight - (clientHeight + scrollTop);
  return pixelsFromBottom;
}
function ifSelf(currentUserName, messageUserName) {
  if (currentUserName === messageUserName) return true;
  return false;
}

const ownMessage = css`
  text-align: right;
  margin: 0.25rem 0;
  justify-self: end;
`;

const otherMessage = css`
  text-align: left;
  margin: 0.25rem 0;
  justify-self: start;
`;

const messagesInnerContainer = css`
  display: grid;
  grid-template-columns: 1fr;
  padding: 1rem 1rem 0rem 1rem;
  max-height: 80vh;
  overflow: hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    background: none;
    width: 1ch;
  }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    opacity: 0.5;
    border-radius: 10px;
  }
  div {
    background: hsl(223, 47%, 23%);
    max-width: 60%;
    padding: 0.5rem;
    border-radius: 0.5rem;
  }

  div * {
    margin: 0.25rem;
    color: #fff;
  }
`;
