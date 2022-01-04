function Input({ context }) {
  return (
    <label>
      {context.name && context.name}
      <input {...context.attributes} />
    </label>
  );
}

export default Input;
