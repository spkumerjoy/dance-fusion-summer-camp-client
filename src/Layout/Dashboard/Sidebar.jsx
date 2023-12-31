import React from "react";
import {
    FaBook,
    FaChalkboardTeacher,
    FaCheckDouble,
    FaFileInvoiceDollar,
    FaFileSignature,
    FaHome,
    FaTasks,
    FaUsersCog,
} from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useUsers from "../../Hooks/useUsers";
import useAdmin from "../../Hooks/useAdmin";

const Sidebar = () => {
    const { user } = useAuth();
    const [users] = useUsers();
    const student = users.find(
        (loggedUser) => loggedUser.email === user?.email
    );

    const studentItem = (
        <>
            <li>
                <NavLink to="/dashboard/my-selected-classes">
                    <FaCheckDouble /> My Selected Class
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/my-enrolled-classes">
                    <FaFileSignature /> My Enrolled Classes
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/payment-history">
                    <FaFileInvoiceDollar /> Payment History
                </NavLink>
            </li>
        </>
    );

    const instructorItem = (
        <>
            <li>
                <NavLink to="/dashboard/add-a-class">
                    <BsDatabaseFillAdd /> Add A Class
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/my-classes">
                    <FaBook /> My Classes
                </NavLink>
            </li>
        </>
    );

    const adminItem = (
        <>
            <li>
                <NavLink to="/dashboard/manage-classes">
                    <FaTasks /> Manage Classes
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/manage-users">
                    <FaUsersCog /> Manage Users
                </NavLink>
            </li>
        </>
    );

    const [isAdmin] = useAdmin();

    let userItem = [];

    if (student && student.role === "student") {
        userItem = [
            <React.Fragment key="studentItem">{studentItem}</React.Fragment>,
        ];
    } else if (student && student.role === "admin") {
        userItem = [
            <React.Fragment key="adminItem">{adminItem}</React.Fragment>,
        ];
    } else if (student && student.role === "instructor") {
        userItem = [
            <React.Fragment key="instructorItem">
                {instructorItem}
            </React.Fragment>,
        ];
    }

    const navItem = (
        <>
            <li>
                <NavLink to="/">
                    <FaHome /> Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/instructors">
                    <FaChalkboardTeacher /> Instructors
                </NavLink>
            </li>
            <li>
                <NavLink to="/classes">
                    <SiGoogleclassroom /> Classes
                </NavLink>
            </li>
        </>
    );
    return (
        <div className="bg-slate-300 w-20 md:w-64 flex flex-col shadow-xl pt-5 h-screen">
            <div className="navbar flex flex-col h-4/5">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 -ml-5 -mt-5"
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
                            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-slate-300 rounded-box w-52"
                        >
                            {userItem}
                            <div className="bg-gray-500 h-0.5 w-full"></div>
                            {navItem}
                        </ul>
                    </div>
                    <Link to="/" className="hidden md:block">
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
