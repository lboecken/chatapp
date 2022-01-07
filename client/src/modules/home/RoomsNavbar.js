import Button from 'modules/common/Button';

function RoomsNavbar({ setCurrentRoom, currentRoom, possibleRooms }) {
  return (
    <div>
      {possibleRooms &&
        possibleRooms.map((room) => {
          return (
            <Button
              text={room}
              attributes={{
                onClick: (e) => {
                  e.preventDefault();
                  setCurrentRoom(room);
                },
              }}
            />
          );
        })}
      <h1>{currentRoom}</h1>
    </div>
  );
}

export default RoomsNavbar;
