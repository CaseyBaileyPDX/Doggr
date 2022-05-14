import {Link} from "react-router-dom";
import React from "react";

export const NavBar = () => {
  return (
    <div className="doggr-navbar-center">
      <Link className="link-primary" to="/">Dashboard</Link>
      &nbsp; | &nbsp;
      <Link className="link-primary" to="/match-history">Match History</Link>
      &nbsp; | &nbsp;
      <Link className="link-primary" to="/create-user">Create User</Link>
      &nbsp; | &nbsp;
      <Link className="link-primary" to="/create-profile">Create Profile</Link>
    </div>
  );
};
