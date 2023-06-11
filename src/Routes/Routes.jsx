import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Instructors from "../Pages/Instructors/Instructors";
import Classes from "../Pages/Classes/Classes";
import NotFound from "../Pages/NotFound/NotFound";
import Dashboard from "../Layout/Dashboard/Dashboard";
import MySelectedClasses from "../Pages/Dashboard/Student/MySelectedClasses/MySelectedClasses";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/instructors",
                element: <Instructors></Instructors>,
            },
            {
                path: "/classes",
                element: <Classes></Classes>,
            },
        ],
    },
    {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: "selected-classes",
                element: <MySelectedClasses></MySelectedClasses>,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound></NotFound>,
    },
]);
