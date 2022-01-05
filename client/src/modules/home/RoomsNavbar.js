import { useRoomsManager } from 'modules/home/helpers';

function updateRoom(newRoom, setCurrentRoom) {
  setCurrentRoom(newRoom);
}
function RoomsNavbar({ setCurrentRoom, currentRoom }) {
  const { proto_currentRoom, proto_possibleRooms, proto_setCurrentRoom } =
    useRoomsManager();
  return (
    <div>
      <hr />
      <hr />
      {/* {proto_possibleRooms.map((room) => {
        return <h2>{room}</h2>;
      })} */}
      {/* problem is that possible_rooms needs to be an array else it cannot be mapped out.  */}
      <hr />
      <hr />
      <button
        onClick={(e) => {
          e.preventDefault();
          updateRoom(e.target.value, setCurrentRoom);
        }}
        value='default'>
        Default
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          updateRoom(e.target.value, setCurrentRoom);
        }}
        value='channel1'>
        Channel 1
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          updateRoom(e.target.value, setCurrentRoom);
        }}
        value='channel2'>
        Channel 2
      </button>
      <h1>{currentRoom}</h1>
    </div>
  );
}

export default RoomsNavbar;
