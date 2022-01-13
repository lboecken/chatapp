function FormInput({ label, inputAttributes, labelAttributes }) {
  return (
    <label {...labelAttributes}>
      {label && label}
      <input {...inputAttributes} />
    </label>
  );
}

export default FormInput;
