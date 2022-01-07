function Input({ label, attributes }) {
  return (
    <label>
      {label && label}
      <input {...attributes} />
    </label>
  );
}

export default Input;
