/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import { icons } from 'modules/icons/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useRedirector } from 'modules/common/utilities';

function Navbar({ setCurrentRoom, possibleRooms, setIsLoggedIn }) {
  const redirect = useRedirector();
  return (
    <div>
      <div css={roomsNavWrapper}>
        {possibleRooms &&
          possibleRooms.map((room) => {
            return (
              <button
                key={room}
                css={roomButton}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentRoom(room);
                }}>
                <img src={getSVG(room)} alt='Icon' width='100%' height='auto' />
              </button>
            );
          })}
      </div>
      <button
        key='logout'
        css={logoutButton}
        onClick={function Logout() {
          setIsLoggedIn(false);
          axios.post('../api/logout').then(() => {
            redirect('./login', { replace: true });
          });
        }}>
        <FontAwesomeIcon icon={faSignOutAlt} />
      </button>
    </div>
  );
}

export default Navbar;

function getSVG(room) {
  switch (room) {
    case 'CSS':
      return icons.css;
    case 'Javascript':
      return icons.javascript;
    case 'Python':
      return icons.python;
    case 'React':
      return icons.react;
    case 'HTML':
      return icons.html;
    default:
      return true;
  }
}

const logoutButton = css`
  position: absolute;
  top: 2.25rem;
  right: 1rem;
  width: 3rem;
  height: auto;
  background: hsl(223, 47%, 23%);
  border-radius: 1.5rem;
  cursor: pointer;
  * {
    padding: 0;
    margin: 0;
    font-size: 2rem;
    color: #fff;
  }
`;

const roomButton = css`
  border: none;
  padding: 0;
  margin: 0.5rem;
  width: 3rem;
  height: auto;
  background: inherit;
  cursor: pointer;
  &hover {
    background: hsl(225, 100%, 98%);
  }
`;

const roomsNavWrapper = css`
  display: flex;
  gap: 0.5rem;
  margin: auto;
  justify-content: center;
`;
