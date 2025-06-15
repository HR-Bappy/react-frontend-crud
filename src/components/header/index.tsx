import { useState } from "react";
import "./index.scss";
import { toast } from "react-toastify";
import {  FaBars, FaTimes } from "react-icons/fa";

function Header({handleClick}:any) {
  const logout = () => {
    toast.success("Logout Success")
    localStorage.removeItem('user')
    window.location.reload();

  }
  return (
  <div id="navbar-wrapper">
  <nav className="navbar navbar-inverse">
    <div className="container-fluid">
      <div className="navbar-header">
        <a href="#" className="navbar-brand faBar" id="sidebar-toggle" onClick={handleClick}><FaBars /></a>
        <a href="#" className="navbar-brand faTimes" id="sidebar-toggle" onClick={handleClick}><FaTimes    /></a>
      </div>
      <div>
        <button className="btn" onClick={logout}>Logout</button>
      </div>
    </div>
  </nav>
</div>


  );
}

export default Header;
