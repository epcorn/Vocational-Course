import { Sidebar } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import { HiUser, HiArrowCircleRight } from "react-icons/hi";
import { GiBookshelf } from "react-icons/gi";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function DashSidebar() {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const [tab, setTab] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get("tab");
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

    const handleSignout = async () => {
        try {
            const res = await fetch("/api/students/signout", {
                method: "POST",
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.messsage);
            } else {
                dispatch(signoutSuccess());
                navigate("/");
            }
        } catch (error) {
            console.log(error.messsage);
        }
    };
    return (
        <>
            <ToastContainer position="top-center" autoClose={3000} />
            <Sidebar className="w-full wd:w-56">
                <Sidebar.Items>
                    <Sidebar.ItemGroup className="flex flex-col gap-1">
                        <Link to="/dashboard/dash?tab=settings">
                            <Sidebar.Item
                                active={tab === "settings"}
                                icon={HiArrowCircleRight}
                                label={currentUser.isAdmin ? "Admin" : "Student"}
                                labelColor="dark"
                                as="div"
                            >
                                Settings
                            </Sidebar.Item>
                        </Link>
                        <Link to="/dashboard/dash?tab=resource">
                            <Sidebar.Item
                                active={tab === "resource"}
                                icon={GiBookshelf}
                                labelColor="dark"
                                as="div"
                            >
                                Resource
                            </Sidebar.Item>
                        </Link>
                        <Sidebar.Item
                            icon={HiUser}
                            className="cursor-pointer"
                            onClick={handleSignout}
                        >
                            Sign Out
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </>
    );
}