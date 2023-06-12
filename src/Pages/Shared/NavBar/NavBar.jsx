import { Link, NavLink } from "react-router-dom";
import { FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import "./NavBar.css";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useState } from "react";
import Swal from "sweetalert2";

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [displayName, setDisplayName] = useState(null);

    const handleLogOut = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to logout now!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Log out!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Log out!", "Logout successful.", "success");
                logOut()
                    .then((result) => {})
                    .catch((error) => console.error(error));
            }
        });
    };

    const navItem = (
        <>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/instructors">Instructors</NavLink>
            </li>
            <li>
                <NavLink to="/classes">Classes</NavLink>
            </li>
        </>
    );
    return (
        <div>
            <div className="navbar bg-base-100 py-5 border-b">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                            id="menu-item"
                        >
                            {navItem}
                        </ul>
                    </div>
                    <Link to="/">
                        <img
                            src="https://joyskyz.com/wp-content/uploads/2023/06/logo.png"
                            alt="Site logo"
                            className="w-36"
                        />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul
                        className="menu menu-horizontal px-1 text-xl  uppercase"
                        id="menu-item"
                    >
                        {navItem}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <>
                            <Link to="/dashboard">
                                <button className="btn glass hover:text-[#FF5300]">
                                    <MdOutlineDashboard className="text-xl" />
                                    Dashboard
                                </button>
                            </Link>
                            <div className="mx-5 md:mr-7 text-center flex justify-center">
                                <img
                                    className="w-11 rounded-full "
                                    src={user.photoURL}
                                    onMouseOver={() =>
                                        setDisplayName(user.displayName)
                                    }
                                    onMouseOut={() => setDisplayName(null)}
                                />
                                {displayName && (
                                    <h2 className="transition duration-150 text-lg font-bold absolute mt-11">
                                        {displayName}
                                    </h2>
                                )}
                            </div>
                            <button
                                onClick={handleLogOut}
                                className="btn text-[#FF5300] hover:text-red-600"
                            >
                                <FaSignOutAlt className="text-xl" />
                                Log Out
                            </button>
                        </>
                    ) : (
                        <Link to="/login">
                            <button className="btn glass hover:text-[#FF5300]">
                                <FaUserAlt /> Login
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavBar;
