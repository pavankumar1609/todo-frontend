import "./Input.css";

function Input({ type = "text", id, register, label, ...rest }) {
  return (
    <div className="form-control">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        {...rest}
        {...register}
        type={type}
        id={id}
        className="form-input"
      />
    </div>
  );
}

export default Input;
