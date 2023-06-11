import React from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
    const studentItem = (
        <>
            <li>
                <NavLink to="/dashboard/my-selected-classes">
                    My Selected Class
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/my-enrolled-classes">
                    My Enrolled Classes
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/payment-history">
                    Payment History
                </NavLink>
            </li>
        </>
    );

    const instructorItem = (
        <>
            <li>
                <NavLink to="/dashboard/add-a-class">Add A Class</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/my-classes">My Classes</NavLink>
            </li>
        </>
    );

    const adminItem = (
        <>
            <li>
                <NavLink to="/dashboard/manage-classes">Manage Classes</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/manage-users">Manage Users</NavLink>
            </li>
        </>
    );

    const userItem = [studentItem, instructorItem, adminItem];

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
        <div className="bg-slate-300 text-white w-64 flex flex-col shadow-xl pt-5">
            <div className="navbar flex flex-col h-4/5">
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
                            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-gray-800 rounded-box w-52"
                        >
                            {userItem}
                            <div className="bg-gray-500 h-0.5 w-full"></div>
                            {navItem}
                        </ul>
                    </div>
                    <Link to="/">
                        <img
                            src="https://joyskyz.com/wp-content/uploads/2023/06/logo.png"
                            alt="Logo"
                        />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex flex-grow">
                    <ul className="menu menu-horizontal px-1 flex flex-col text-lg text-[#0f295a]">
                        {userItem}
                        <div className="bg-gray-500 h-0.5 w-full my-5"></div>
                        {navItem}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
