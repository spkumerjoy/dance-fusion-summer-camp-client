import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Instructors from "../Pages/Instructors/Instructors";
import Classes from "../Pages/Classes/Classes";
import NotFound from "../Pages/NotFound/NotFound";
import Dashboard from "../Layout/Dashboard/Dashboard";
import MySelectedClasses from "../Pages/Dashboard/Student/MySelectedClasses/MySelectedClasses";
import ManageClasses from "../Pages/Dashboard/Admin/ManageClasses/ManageClasses";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers/ManageUsers";
import AddAClass from "../Pages/Dashboard/Instructor/AddAClass/AddAClass";
import MyClasses from "../Pages/Dashboard/Instructor/MyClasses/MyClasses";
import MyEnrolledClasses from "../Pages/Dashboard/Student/MyEnrolledClasses/MyEnrolledClasses";
import PaymentHistory from "../Pages/Dashboard/Student/PaymentHistory/PaymentHistory";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import UpdateClass from "../Pages/Dashboard/Instructor/MyClasses/UpdateClass";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "instructors",
                element: <Instructors />,
            },
            {
                path: "classes",
                element: <Classes />,
            },
        ],
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "sign-up",
        element: <SignUp />,
    },
    {
        path: "dashboard",
        element: (
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        ),
        children: [
            {
                path: "manage-classes",
                element: <ManageClasses />,
            },
            {
                path: "manage-users",
                element: <ManageUsers />,
            },
            {
                path: "add-a-class",
                element: <AddAClass />,
            },
            {
                path: "update-class/:id",
                element: (
                    <PrivateRoute>
                        <UpdateClass />
                    </PrivateRoute>
                ),

                loader: ({ params }) =>
                    fetch(`http://localhost:5000/classes/${params.id}`),
            },
            {
                path: "my-classes",
                element: <MyClasses />,
            },
            {
                path: "my-selected-classes",
                element: <MySelectedClasses />,
            },
            {
                path: "my-enrolled-classes",
                element: <MyEnrolledClasses />,
            },
            {
                path: "payment-history",
                element: <PaymentHistory />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound></NotFound>,
    },
]);
