function Messages(props) {
  return (
    <ul>
      {props.messages.map((message) => {
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
