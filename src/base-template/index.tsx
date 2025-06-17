import Header from "../components/header";
import SideBar from "../components/sidebar";
import Login from "../pages/login";
import "./index.scss";
import "./common.scss"
import PageRoutes from "../pages";
function BaseTemplate() {
  const user = localStorage.getItem("user");
  const handleClick = () => {
    const wrapper: any = document.querySelector('#wrapper');
    wrapper.classList.toggle('toggled');
  }

  return (
    <div className="">
      {user ? (
        <div id="wrapper">
          <SideBar />
          <Header handleClick={handleClick} />
          <section id="content-wrapper">
            <PageRoutes />

          </section>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
export default BaseTemplate;
