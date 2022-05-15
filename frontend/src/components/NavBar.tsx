import {Link} from "react-router-dom";
import React from "react";
import {AuthContext, AuthContextProps, useAuth} from "../services/AuthService";

export const NavBar = () => {

  const context = useAuth();

  const handleLogout = () => {
    console.log("Setting token to null");
    context?.handleLogout();
  }



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
      { context?.token !== null  ?
        <Link className="link-primary" to="/" onClick={handleLogout}>Logout</Link>
         :
        <Link className="link-primary" to="/login">Login</Link>
      }
    </div>
  );
};
