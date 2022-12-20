import React, { useEffect, useState } from "react";
import TodoNavbar from "./TodoNavbar";
import { getUser } from "../services/userService";
import "./Profile.css";

function UserDetails() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const { data: user } = await getUser();

      setUser(user);
    };

    getData();
  }, []);

  return (
    <>
      <TodoNavbar />
      <main className="container">
        <div className="profile">
          <h1 className="profile-header">
            User <span>Details</span>
          </h1>
          <ul className="profile-body">
            <li>
              <h3>Name</h3> {user?.name}
            </li>
            <li>
              <h3>Email</h3> {user?.email}
            </li>
          </ul>
        </div>
      </main>
    </>
  );
}

export default UserDetails;
