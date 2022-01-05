function Button({ context }) {
  return <button {...context.attributes}>{context.text}</button>;
}

export default Button;
