function RoomsNavbar(props) {
  const updateRoom = (e) => {
    e.preventDefault();
    props.setCurrentRoom(e.target.value);
    props.socket.emit(
      'UPDATE_ROOM',
      { roomName: e.target.value },
      (payload) => {
        console.log(payload);
      }
    );
  };
  return (
    <div>
      <button onClick={(e) => updateRoom(e)} value='default'>
        Default
      </button>
      <button onClick={(e) => updateRoom(e)} value='channel1'>
        Channel 1
      </button>
      <button onClick={(e) => updateRoom(e)} value='channel2'>
        Channel 2
      </button>
    </div>
  );
}

export default RoomsNavbar;