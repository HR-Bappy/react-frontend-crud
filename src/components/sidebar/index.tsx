import { Link, useLocation } from "react-router-dom";
import "./index.scss";
import { FaHome, FaRegUser } from "react-icons/fa";
import Logo from '../../assets/img/visa.png'
function SideBar() {
  let location = useLocation();
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
  ]
  return (

   <aside id="sidebar-wrapper">
  <div className="sidebar-brand">
    <Link  to='/'><img style={{width:'50px'}} src={Logo}/></Link>
  </div>
  <ul className="sidebar-nav">
    {navlink.map((item) => {
      const isActive = item.link === '/' 
  ? location.pathname === '/' 
  : location.pathname.startsWith(item.link);
      return (
        <li className={`nav-link ${isActive ? 'active' : ''}`} key={item.id}>
          <Link to={item.link}>
            {item.icon}
            {item.title}
          </Link>
        </li>
      );
    })}
  </ul>
</aside>
  );
}

export default SideBar;
