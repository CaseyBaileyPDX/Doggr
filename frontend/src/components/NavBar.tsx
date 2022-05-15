import {Link} from "react-router-dom";
import React from "react";
import {deleteToken} from "../services/AuthService";

export const NavBar = ({token, setToken}) => {

  const handleLogout = () => {
    console.log("Setting token to null");
    deleteToken(setToken);
  }

  console.log(token);

  return (
    <div className="doggr-navbar-center">
      <Link className="link-primary" to="/">Dashboard</Link>
      &nbsp; | &nbsp;
      <Link className="link-primary" to="/match-history">Match History</Link>
      &nbsp; | &nbsp;
      <Link className="link-primary" to="/create-user">Create User</Link>
      &nbsp; | &nbsp;
      <Link className="link-primary" to="/create-profile">Create Profile</Link>
      &nbsp; | &nbsp;
      { token !== null  ?
        <Link to="/" onClick={handleLogout}>Logout</Link>
         :
        <Link to="/login">Login</Link>
      }



    </div>
  );
};
