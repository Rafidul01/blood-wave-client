import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../pages/Profile/Profile";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/register",
            element: <Register/>
        },
        {
            path: "/login",
            element: <Login/>
        },

    ]
  },
  {
    path: "/dashboard",
    element: <DashboardLayout/>,
    children: [
      {
        path: "profile",
        element: <Profile/>
      }
    ]
  }
]);

export default router;
