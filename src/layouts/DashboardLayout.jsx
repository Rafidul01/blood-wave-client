import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";

const DashboardLayout = () => {

    const handleSidebar = () => {
        document.getElementById("my-drawer-2").checked = false
    }
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content ">
        {/* Page content here */}
        
        <label
          htmlFor="my-drawer-2"
          className="btn bg-transparent border-none shadow-none drawer-button  lg:hidden"
        >
          <GiHamburgerMenu className="w-6 h-6" />
        </label>
        <div >
            <h1>sldjfkjdsjf</h1>
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
          <button className=" lg:hidden btn btn-primary" onClick={ handleSidebar }>X</button>
          <li>
          <NavLink
          className={({ isActive }) =>
            isActive
              ? "border-b-4 bg-transparent  border-blood text-blood font-bold "
              : ""
          }
          to="/dashboard/profile"
        >
          Donation Requests
        </NavLink>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
        
      </div>
      
    </div>
  );
};

export default DashboardLayout;
