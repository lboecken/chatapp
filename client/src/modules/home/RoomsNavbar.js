import { useEffect } from 'react';
import { getPossibleRooms } from 'modules/home/helpers';

function RoomsNavbar({ context }) {
  const { setCurrentRoom, socket, currentRoom } = context;
  const updateRoom = (e) => {
    e.preventDefault();
    setCurrentRoom(e.target.value);
    socket.emit('update-room', { roomName: e.target.value }, (payload) => {
      console.log(payload);
    });
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
      <h1>{currentRoom}</h1>
    </div>
  );
}

export default RoomsNavbar;
