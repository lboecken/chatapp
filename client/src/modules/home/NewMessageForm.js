import Button from 'modules/common/Button';
import Input from 'modules/common/Input';

function sendMessageToServer(socket, newMessage) {
  socket.emit('new-message', {
    message: newMessage,
    timeStamp: getUtcSecondsSinceEpoch(),
  });
}

function getUtcSecondsSinceEpoch() {
  const now = new Date();
  const utcMilllisecondsSinceEpoch = now.getTime();
  const utcSecondsSinceEpoch = Math.round(utcMilllisecondsSinceEpoch / 1000);
  return utcSecondsSinceEpoch;
}

function NewMessageForm({ socket, newMessage, setNewMessage }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessageToServer(socket, newMessage);
      }}>
      <Input
        attributes={{
          placeholder: 'enter your message here',
          value: newMessage,
          onChange: (e) => setNewMessage(e.target.value),
        }}
      />
      <Button text='Submit' />
    </form>
  );
}

export default NewMessageForm;
