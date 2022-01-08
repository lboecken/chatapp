function Messages({ messages }) {
  return (
    <ul>
      {messages.map((message) => {
        return (
          <li
            key={
              message.timestamp + '_' + message.userID + '_' + Math.random()
            }>
            <h4>{message.userID}</h4>
            {message.message}
            <hr />
            {message.timeStamp}
          </li>
        );
      })}
    </ul>
  );
}

export default Messages;
