import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./index.scss";
import { FaHome, FaRegUser, FaUserCog } from "react-icons/fa";

function SideBar() {
  let location = useLocation();
  console.log('location', location)
  const navlink = [
    {
      id: 0,
      icon: <FaHome className="site_bar_icon" />,
      link: '/',
      title: "Dashboard",
      class: `nav-link  ${location?.pathname == '/' ? 'active' : ''}`
    }, {
      id: 1,
      icon: <FaRegUser className="site_bar_icon" />,
      link: '/employee',
      title: "Employee",
      class: `nav-link  ${location?.pathname == '/employee' ? 'active' : ''}`
    }
    // , {
    //   id: 2,
    //   icon: <FaUserCog className="site_bar_icon" />,
    //   link: '/role',
    //   title: "Role",
    //   class:`nav-link  ${location?.pathname=='/role'?'active':''}`
    // }
  ]
  const handleActive = (index: any) => {
    const links: any = document.querySelectorAll('.nav-link');
    for (let i = 0; i < links?.length; i++) {
      links[i].classList.remove("active")
      if (i == index)
        links[i].classList.add("active")
    }
  }
  return (

    <aside id="sidebar-wrapper">
      <div className="sidebar-brand">
        <h2>Logo</h2>
      </div>
      <ul className="sidebar-nav">
        {
          navlink?.map((item: any, index: number) => {
            console.log('nav', item)
            return (
              <li className={item?.class} key={item?.id}>
                <Link onClick={() => handleActive(index)} to={item?.link}>{item?.icon}{item?.title}</Link>
              </li>
            )
          })
        }

      </ul>
    </aside>
  );
}

export default SideBar;
