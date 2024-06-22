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
import AllUsers from "../pages/AllUsers/AllUsers";
import AllDonationRequest from "../pages/AllDonationRequest/AllDonationRequest";
import ContentManagement from "../pages/ContentManagement/ContentManagement";
import AddBlog from "../pages/AddBlog/AddBlog";
import SearchDonor from "../pages/SearchDonor/SearchDonor";
import BloodDonationRequests from "../pages/BloodDonationRequests/BloodDonationRequests";
import Blogs from "../pages/Blogs/Blogs";
import BlogDetails from "../pages/Blogs/BlogDetails";
import AdminRoute from "./AdminRoute";
import Error from "../pages/Shared/Error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error/>,
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
      {
        path: "/search-donor",
        element: <SearchDonor></SearchDonor>,
      },
      {
        path: "/blood-donation-request",
        element: <BloodDonationRequests></BloodDonationRequests>,
      },
      {
        path: "/blog",
        element: <Blogs></Blogs>,
      },
      {
        path: "/blogs/:id",
        element: <BlogDetails></BlogDetails>,
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
          <AdminRoute>
            <PrivateRoute>
              <DonationRequestEdit />
            </PrivateRoute>
          </AdminRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <PrivateRoute>
            {" "}
            <AllUsers />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "all-blood-donation-request",
        element: (
          <PrivateRoute>
            {" "}
            <AllDonationRequest />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "content-management",
        element: (
          <PrivateRoute>
            {" "}
            <ContentManagement />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "add-blog",
        element: (
          <PrivateRoute>
            {" "}
            <AddBlog />{" "}
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
