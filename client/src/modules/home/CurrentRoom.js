/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function CurrentRoom({ currentRoom }) {
  return <h2 css={roomName}>{currentRoom}</h2>;
}

export default CurrentRoom;

const roomName = css`
  text-align: center;
  margins: auto;
  font-size: 2rem;
`;
