import "./Button.css";

function Button({ label, children, ...rest }) {
  return children ? (
    <button {...rest} className="btn">
      {children}
    </button>
  ) : (
    <button {...rest} className="btn">
      {label}
    </button>
  );
}

export default Button;
