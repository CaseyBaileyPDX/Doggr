import {Outlet} from "react-router-dom";
import React from "react";
import {NavBar} from "./NavBar";

const Header = () => {
  return (<div className={"doggrcenter"}>
      <div className="header">Doggr</div>
      <div className="text-xl subheader ">Where your pets find love(tm)</div>
      <NavBar/>
      <br/>
      <Outlet/>
    </div>
  );
};


export default Header;
