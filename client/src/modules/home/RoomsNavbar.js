/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from 'modules/common/Button';
import axios from 'axios';
import cssLogo from 'modules/icons/CSS.svg';
import javascriptLogo from 'modules/icons/Javascript.svg';
import pythonLogo from 'modules/icons/Python.svg';
import reactLogo from 'modules/icons/React.svg';
import htmlLogo from 'modules/icons/HTML.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function Navbar({ setCurrentRoom, possibleRooms, setIsLoggedIn }) {
  return (
    <div>
      <div css={roomsNavWrapper}>
        {possibleRooms &&
          possibleRooms.map((room) => {
            return (
              <button
                css={roomButton}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentRoom(room);
                }}>
                <img
                  src={getSVG(room)}
                  viewbox='0 0 512 512'
                  alt='Icon'
                  width='100%'
                  height='auto'
                />
              </button>
            );
          })}
      </div>
      <button
        css={logoutButton}
        onClick={function Logout() {
          setIsLoggedIn(false);
          axios.post('../api/logout');
          console.log('log out ran');
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
      return cssLogo;
    case 'Javascript':
      return javascriptLogo;
    case 'Python':
      return pythonLogo;
    case 'React':
      return reactLogo;
    case 'HTML':
      return htmlLogo;
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
