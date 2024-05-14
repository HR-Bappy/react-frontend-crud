import { useState } from "react";
import "./index.scss";
import { toast } from "react-toastify";

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
        <a href="#" className="navbar-brand" id="sidebar-toggle" onClick={handleClick}>=</a>
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
