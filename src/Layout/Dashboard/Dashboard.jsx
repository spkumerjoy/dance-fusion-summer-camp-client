import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./Topbar";

const Dashboard = () => {
    return (
        <div className="flex h-[83.5px] md:h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <TopBar />
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
