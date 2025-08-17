import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { use } from "react";
import { AuthContext } from "../components/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = use(AuthContext); // get logout function from context
  const [profile, setProfile] = useState(null);

  // fetch user profile from backend (MongoDB)
  useEffect(() => {
    if (user?.uid) {
      fetch(`http://localhost:3000/users/${user.uid}`)
        .then((res) => res.json())
        .then((data) => setProfile(data))
        .catch((err) => console.error("Profile fetch failed:", err));
    }
  }, [user]);

  // handle logout
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1677ff",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire("Logged Out!", "You have been logged out.", "success");
          })
          .catch((err) => {
            Swal.fire("Error!", err.message, "error");
          });
      }
    });
  };

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-6 ${
            isActive
              ? "btn rounded-2xl bg-[rgb(23,106,229)] text-white text-center mr-2"
              : "text-gray-600"
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to={`/schedule`}
        className={({ isActive }) =>
          `px-6 ${
            isActive
              ? "btn rounded-2xl bg-[rgb(23,106,229)] text-white text-center mr-2"
              : "text-gray-600"
          }`
        }
      >
        My-Bookings
      </NavLink>

      {/* conditional nav item */}
      {profile?.accountType === "ordinary" ? (
        <NavLink
          to={`/buy-medicine`}
          className={({ isActive }) =>
            `px-6 ${
              isActive
                ? "btn rounded-2xl bg-[rgb(23,106,229)] text-white text-center mr-2"
                : "text-gray-600"
            }`
          }
        >
          Buy Medicine
        </NavLink>
      ) : profile?.accountType === "business" ? (
        <NavLink
          to={`/add-business`}
          className={({ isActive }) =>
            `px-6 ${
              isActive
                ? "btn rounded-2xl bg-[rgb(23,106,229)] text-white text-center mr-2"
                : "text-gray-600"
            }`
          }
        >
          Add Your Business
        </NavLink>
      ) : null}

      <NavLink
        to={`/userDetails`}
        className={({ isActive }) =>
          `px-6 ${
            isActive
              ? "btn rounded-2xl bg-[rgb(23,106,229)] text-white text-center mr-2"
              : "text-gray-600"
          }`
        }
      >
        My Profile
      </NavLink>
    </>
  );

  return (
    <div>
      <div className="navbar lg:w-10/12 mx-auto py-5 ">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to={`/`}>
            <div className="flex gap-3 place-items-center">
              <h1 className="text-3xl font-bold">Online Health Care</h1>
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className=" px-1">{links}</ul>
        </div>
        <div className="navbar-end ">
          {!user ? (
            <Link
              to="/auth/login"
              className="btn rounded-3xl bg-[rgb(23,106,229)] text-white"
            >
              Login
            </Link>
          ) : (
            <div className="flex gap-3 items-center">
              <span className="font-semibold">{user.email}</span>
              <button
                onClick={handleLogout}
                className="btn rounded-3xl bg-red-500 text-white"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
