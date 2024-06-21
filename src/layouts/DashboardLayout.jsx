import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const DashboardLayout = () => {
  const handleSidebar = () => {
    document.getElementById("my-drawer-2").checked = false;
  };
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        {/* Page content here */}

        <label
          htmlFor="my-drawer-2"
          className="btn bg-transparent border-none shadow-none drawer-button  lg:hidden"
        >
          <GiHamburgerMenu className="w-6 h-6" />
        </label>
        <div className="m-1">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-blood  text-base-content">
          {/* Sidebar content here */}
          <button
            className=" lg:hidden btn btn-primary"
            onClick={handleSidebar}
          >
            X
          </button>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "border-b-4 bg-transparent  border-white text-white font-bold "
                  : ""
              }
              to="/dashboard"
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "border-b-4 bg-transparent  border-white text-white font-bold "
                  : ""
              }
              to="/dashboard/profile"
            >
              profile
            </NavLink>
          </li>
          
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "border-b-4 bg-transparent  border-white text-white font-bold "
                  : ""
              }
              to="/dashboard/create-donation-request"
            >
              Create Donation Request
            </NavLink>
          </li>
          
        </ul>
      </div>
      <ToastContainer  position="top-center"/>
    </div>
  );
};

export default DashboardLayout;
