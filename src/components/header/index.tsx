import { useState } from "react";
import Dropdown from "react-dropdown";
import "./index.scss";
import { toast } from "react-toastify";
import { FaBars, FaSignOutAlt, FaTimes, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LocalStorageService } from "../../services/localStorage.service";
const profileOption = [
  {
    id: 1,
    label: "Profile",
    value: "profile",
    icon: <FaUser />,
    color: "text-info",
  },
  {
    id: 2,
    label: "Logout",
    value: "logout",
    icon: <FaSignOutAlt />,
    color: "text-danger",
  },
];
function Header({ handleClick }: any) {
  const user: any = JSON.parse(localStorage.getItem("user") ?? "");
  const navigator = useNavigate();
  const [show, setShow] = useState<boolean>(false);
  const logout = () => {
    toast.success("Logout Success");
    LocalStorageService.clear()
    navigator('/')
    window.location.reload();
  };
  const handleChange = (data: any) => {
    if (data?.value === "profile") {
      navigator("/profile");
    } else if (data?.value === "logout") logout();

    setShow(false);
  };
  return (
    <div id="navbar-wrapper">
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a
              href="#"
              className="navbar-brand faBar"
              id="sidebar-toggle"
              onClick={handleClick}
            >
              <FaBars />
            </a>
            <a
              href="#"
              className="navbar-brand faTimes"
              id="sidebar-toggle"
              onClick={handleClick}
            >
              <FaTimes />
            </a>
          </div>
          <div className="dropdown__ me-3">
            <img
              className="dropdown_btn"
              onClick={() => setShow(!show)}
              src={user?.image}
              alt="Profile"
            />
            {show && (
              <div className="dropdown--items">
                {profileOption?.map((item: any, index: number) => {
                  return (
                    <li
                      key={index}
                      onClick={() => handleChange(item)}
                      className={item.color}
                    >
                      {item.icon} {item.label}
                    </li>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
