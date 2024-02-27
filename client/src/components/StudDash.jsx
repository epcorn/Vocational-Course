import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashProfile from "./DashProfile";
import DashSidebar from "./DashSidebar";
import { Resource } from "./Resource";


export default function Dashboard() {
    const location = useLocation();
    const [tab, setTab] = useState("settings");

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get("tab");
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

    return (
        <div className=" min-h-screen max-w-7xl bg-slate-100 mx-auto flex flex-col md:flex-row">
            <div className=" md:w-56">
                {/*Sidebar */}
                <DashSidebar />
            </div>
            {/* profile */}
            {tab === "settings" && <DashProfile />}
            {/* resource */}
            {tab === "resource" && <Resource />}

        </div>
    );
}