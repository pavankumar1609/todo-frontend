import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found">
      <h1>Oops, this page does not exist</h1>
      <Link to="/">RETURN HOME</Link>
    </div>
  );
}

export default NotFound;
