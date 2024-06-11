import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/image/logo.png";
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  // test user
  const user = false;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const Links = (
    <>
      <li className="hover:text-blood ">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "border-b-4 bg-transparent  border-blood text-blood font-bold "
              : ""
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li className="hover:text-blood ">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "border-b-4 bg-transparent  border-blood text-blood font-bold "
              : ""
          }
          to="/donationRequests"
        >
          Donation Requests
        </NavLink>
      </li>
      <li className="hover:text-blood ">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "border-b-4 bg-transparent  border-blood text-blood font-bold "
              : ""
          }
          to="/blog"
        >
          Blog
        </NavLink>
      </li>
      {
        user && <li className="hover:text-blood ">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "border-b-4 bg-transparent  border-blood text-blood font-bold "
              : ""
          }
          to="/fundings"
        >
          Fundings
        </NavLink>
      </li>
      }
    </>
  );
  return (
    <div
      className={`font-lato fixed top-0 right-0 left-0  bg-base-100 z-50 ${
        scrolled
          ? "transition delay-10  backdrop-blur-sm bg-white/70 border-b rounded-b-2xl border-opacity-30 border-blood"
          : "bg-transparent"
      }`}
    >
      <div className=" container mx-auto navbar ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {Links}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost p-0 text-xl">
            <img src={logo} alt="" className="h-10" />
            <h1 className="text-3xl">
              Blood <span className="text-blood">Wave</span>
            </h1>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{Links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={logo} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "border-b-4 bg-transparent  border-blood text-blood font-bold "
                        : ""
                    }
                    to="/dashboard"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <Link
                    
                    className="btn hidden md:flex bg-blood  text-white font-lato rounded-xl min-h-0 h-10 md:min-h-[3rem] md:h-[3rem]"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn hidden md:flex bg-blood  text-white font-lato rounded-xl min-h-0 h-10 md:min-h-[3rem] md:h-[3rem]"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
