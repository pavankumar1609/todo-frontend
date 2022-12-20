import { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../contexts/userContext";
import "./TodoNavbar.css";

function TodoNavbar() {
  const [isActive, setIsActive] = useState(false);
  const user = useContext(UserContext);

  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <h1>Todo-List</h1>
        </div>
        <ul
          className={isActive ? "list active" : "list"}
          style={user?.isAdmin && { width: "50%" }}
        >
          <li>
            <NavLink
              style={({ isActive }) =>
                isActive ? { color: "lightgray" } : { color: "" }
              }
              to="/profile"
            >
              {user?.name}
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) =>
                isActive ? { color: "lightgray" } : { color: "" }
              }
              to="/todos"
            >
              Todos
            </NavLink>
          </li>
          {user?.isAdmin && (
            <>
              <li>
                <NavLink
                  style={({ isActive }) =>
                    isActive ? { color: "lightgray" } : { color: "" }
                  }
                  to="/admin"
                >
                  Admin
                </NavLink>
              </li>
              <li>
                <NavLink
                  style={({ isActive }) =>
                    isActive ? { color: "lightgray" } : { color: "" }
                  }
                  to="/users"
                >
                  Users
                </NavLink>
              </li>
            </>
          )}
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
        <div className="menu">
          {!isActive ? (
            <MdMenu
              size={"2em"}
              className={"clickable"}
              color={"white"}
              onClick={() => setIsActive((prev) => !prev)}
            />
          ) : (
            <MdClose
              size={"2em"}
              color={"white"}
              className={"clickable"}
              onClick={() => setIsActive((prev) => !prev)}
            />
          )}
        </div>
      </nav>
    </header>
  );
}

export default TodoNavbar;
