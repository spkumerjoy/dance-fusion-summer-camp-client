import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./Topbar";

const Dashboard = () => {
    return (
        <div className="flex h-screen">
            <div className="sticky top-0 h-screen">
                <Sidebar />
            </div>
            <div className="flex flex-col flex-1">
                <div className="sticky top-0">
                    <TopBar />
                </div>
                <div className="overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
