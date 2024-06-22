import { GiHamburgerMenu } from "react-icons/gi";
import { Link, NavLink, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/image/logo.png";
import useAdmin from "../hooks/useAdmin";
import useVolunteer from "../hooks/useVolunteer";
import { FaHome, FaUser } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdBloodtype, MdContentPaste } from "react-icons/md";

const DashboardLayout = () => {

  const [isAdmin] = useAdmin();
  const [isVolunteer] = useVolunteer();
  const donorLink = (
    <>

      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "border-b-4 bg-transparent  border-white text-white font-bold "
              : ""
          }
          to="/dashboard/create-donation-request"
        >
         <MdBloodtype/> Create Donation Request
        </NavLink>
      </li>
    </>
  );

  const adminLink = (
    <>
          
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "border-b-4 bg-transparent  border-white text-white font-bold "
              : ""
          }
          to="/dashboard/all-users"
        >
          <FaPeopleGroup/>All Users
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "border-b-4 bg-transparent  border-white text-white font-bold "
              : ""
          }
          to="/dashboard/all-blood-donation-request"
        >
          <MdBloodtype />All Blood Donation Request
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "border-b-4 bg-transparent  border-white text-white font-bold "
              : ""
          }
          to="/dashboard/content-management"
        >
          <MdContentPaste />Content Management
          
        </NavLink>
      </li>
    </>
  );
  const volunteerLink = (
    <>
          
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "border-b-4 bg-transparent  border-white text-white font-bold "
              : ""
          }
          to="/dashboard/all-blood-donation-request"
        >
          <MdBloodtype />All Blood Donation Request
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "border-b-4 bg-transparent  border-white text-white font-bold "
              : ""
          }
          to="/dashboard/content-management"
        >
          <MdContentPaste />Content Management
          
        </NavLink>
      </li>
    </>
  );
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
        <ul onClick={handleSidebar} className="menu p-4 w-80 min-h-full bg-blood text-base-content text-[#acacac] ">
          {/* Sidebar content here */}
          <Link to="/" className="btn m-0 p-0 mb-8">
            <img src={logo} className="w-10" alt="" />
            <span className="ml-2 text-xl">
              <span className="text-blood ">Blood</span> Wave
            </span>
          </Link>

          <button
            className=" lg:hidden btn btn-sm btn-circle absolute right-2 top-20 z-50 "
            onClick={handleSidebar}
          >
            x
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
              <FaHome></FaHome>Dashboard Home
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
          <FaUser></FaUser>profile
        </NavLink>
      </li>

      {
        isAdmin ? adminLink : isVolunteer ? volunteerLink : donorLink
      }

          {/* {donorLink} */}
          {/* <hr />

          {adminLink} */}

          <hr className="my-8" />

         <li>
         <NavLink
            className={({ isActive }) =>
              isActive
                ? "border-b-4 bg-transparent  border-white text-white font-bold "
                : ""
            }
            to="/"
            end
          >
             <FaHome></FaHome>Home
          </NavLink>

         </li>
        </ul>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default DashboardLayout;
