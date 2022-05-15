import {Outlet} from "react-router-dom";
import React from "react";
import {NavBar} from "./NavBar";

const Header = ({token, setToken} ) => {
  return (
    <div className="doggrcenter select-none">
      <div className="header">Doggr</div>
      <div className="text-xl subheader ">Where your pets find love(tm)</div>
      <NavBar token={token} setToken={setToken} />
    </div>
  );
};


export default Header;
