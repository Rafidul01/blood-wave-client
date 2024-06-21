import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../pages/Profile/Profile";
import PrivateRoute from "./PrivateRoute";
import CreateDonationRequest from "../pages/CreateDonationRequest/CreateDonationRequest";


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
    path: "dashboard",
    element: <DashboardLayout/>,
    children: [
      {
        path: "profile",
        element:  <PrivateRoute><Profile/></PrivateRoute>,
      },
      {
        path: "create-donation-request",
        element:  <PrivateRoute><CreateDonationRequest/></PrivateRoute>,
      },
      
    ]
  }
]);

export default router;
