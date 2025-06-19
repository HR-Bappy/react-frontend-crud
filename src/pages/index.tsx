import { Route, Routes } from "react-router-dom";
import User from "./product";
import AddUser from "./product/add-product";
import EditUser from "./product/edit-product";
import Dashboard from "./dashboard";
import ProfilePage from "./profile";

const routes = [
  { path: "/", element: <Dashboard /> },
  { path: "/product", element: <User /> },
  { path: "/product/:id", element: <EditUser /> },
  { path: "/product/add", element: <AddUser /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "*", element: <h1>404</h1> }, // 404 Page
];

function PageRoutes() {
  return (
    <Routes>
      <>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </>
    </Routes>
  );
}
export default PageRoutes;
