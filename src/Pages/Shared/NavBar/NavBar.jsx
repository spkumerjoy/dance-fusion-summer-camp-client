import { Link, NavLink } from "react-router-dom";
import { FaMoon, FaSignOutAlt, FaSun, FaUserAlt } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import "./NavBar.css";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useUsers from "../../../Hooks/useUsers";
import { useEffect } from "react";

const NavBar = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
    );

    const handleToggle = (e) => {
        if (e.target.checked) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    };
    useEffect(() => {
        localStorage.setItem("theme", theme);
        const localTheme = localStorage.getItem("theme");
        document.querySelector("html").setAttribute("data-theme", localTheme);
    }, [theme]);

    const { user, logOut } = useAuth();
    const [users] = useUsers();
    const [displayName, setDisplayName] = useState(null);

    const activeUser = users.find((allUser) => allUser.email === user?.email);
    console.log(activeUser);

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
                            className="w-20 md:w-36"
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
                            <Link
                                to={
                                    activeUser?.role === "admin"
                                        ? "/dashboard/manage-classes"
                                        : activeUser?.role === "student"
                                        ? "/dashboard/my-selected-classes"
                                        : "/dashboard/add-a-class"
                                }
                            >
                                <button className="btn glass btn-xs sm:btn-sm md:btn-md hover:text-[#FF5300]">
                                    <MdOutlineDashboard className="text-xl" />
                                    Dashboard
                                </button>
                            </Link>
                            <div className="mx-5 md:mr-7 text-center sm:flex justify-center hidden">
                                <img
                                    className="w-11 rounded-full"
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
                                className="btn btn-xs sm:btn-sm md:btn-md text-[#FF5300] hover:text-red-600"
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
                    <button className="btn btn-square btn-ghost">
                        <label className="swap swap-rotate w-12 h-12">
                            <input
                                type="checkbox"
                                onChange={handleToggle}
                                // show toggle image based on localstorage theme
                                checked={theme === "light" ? false : true}
                            />
                            {/* light theme sun image */}
                            <FaSun className="w-8 h-8 swap-on" />
                            {/* dark theme moon image */}
                            <FaMoon className="w-8 h-8 swap-off" />
                        </label>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
