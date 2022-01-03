import { useEffect, useState } from 'react';
import { getPossibleRooms } from '../../helpers';
function RoomsNavbar(props) {
  const [possibleRooms, setPossibleRooms] = useState([]);
  const updateRoom = (e) => {
    e.preventDefault();
    props.setCurrentRoom(e.target.value);
    props.socket.emit(
      'update-room',
      { roomName: e.target.value },
      (payload) => {
        console.log(payload);
      }
    );
  };

  useEffect(() => {
    console.log(getPossibleRooms());
    // setPossibleRooms(availableRooms);
  }, []);

  return (
    <div>
      {/* {possibleRooms.map((room) => {
        return <h2>{room}</h2>;
      })} */}
      <button onClick={(e) => updateRoom(e)} value='default'>
        Default
      </button>
      <button onClick={(e) => updateRoom(e)} value='channel1'>
        Channel 1
      </button>
      <button onClick={(e) => updateRoom(e)} value='channel2'>
        Channel 2
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          getPossibleRooms();
        }}>
        Get Rooms
      </button>
    </div>
  );
}

export default RoomsNavbar;
