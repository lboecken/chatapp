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
    </div>
  );
}

export default RoomsNavbar;
