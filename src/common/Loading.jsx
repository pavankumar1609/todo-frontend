import "./Loading.css";

function Loading({ label = "Loading..." }) {
  return <div className="spinner">{label}</div>;
}

export default Loading;
