import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../pages/Profile/Profile";
import PrivateRoute from "./PrivateRoute";
import CreateDonationRequest from "../pages/CreateDonationRequest/CreateDonationRequest";
import DashboardHome from "../pages/DashboardHome/DashboardHome";
import MyDonationRequest from "../pages/MyDonationRequest/MyDonationRequest";
import DonationRequestDetails from "../pages/DonationRequestDetails/DonationRequestDetails";
import DonationRequestEdit from "../pages/DonationRequestEdit/DonationRequestEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/donation-request-details/:id",
        element: (
          <PrivateRoute>
            <DonationRequestDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: (
          <PrivateRoute>
            <DashboardHome />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "create-donation-request",
        element: (
          <PrivateRoute>
            <CreateDonationRequest />
          </PrivateRoute>
        ),
      },
      {
        path: "my-donation-requests",
        element: (
          <PrivateRoute>
            {" "}
            <MyDonationRequest />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "donation-request-edit/:id",
        element: (
          <PrivateRoute>
            <DonationRequestEdit />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
