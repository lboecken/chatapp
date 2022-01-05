function Messages({messages}) {
  return (
    <ul>
      {messages.map((message) => {
        return (
          <li>
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
