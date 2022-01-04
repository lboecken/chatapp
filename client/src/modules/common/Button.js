function Button({ context }) {
  return (
    <div>
      <button
        className={context.class}
        onClick={(e) => {
          e.preventDefault();
          context.function();
        }}>
        {context.text}
      </button>
    </div>
  );
}

export default Button;
