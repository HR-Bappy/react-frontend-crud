import { Route, Routes } from "react-router-dom";
import User from "./user";
import AddUser from "./user/add-user";
import EditUser from "./user/edit-user";
import Dashboard from "./dashboard";

const routes = [
  { path: "/", element: <Dashboard /> },
  { path: "/employee", element: <User /> },
  { path: "/employee/:id", element: <EditUser /> },
  { path: "/employee/add", element: <AddUser /> },
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
