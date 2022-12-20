import { useEffect } from "react";
import auth from "../services/authService";

function Logout() {
  useEffect(() => {
    auth.logoutUser();
    window.location.href = "/";
  }, []);

  return null;
}

export default Logout;
