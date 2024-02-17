import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Logo } from "../components/Logo";

export default function AdminHeader() {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const path = location.pathname;

    const handleSignout = async () => {
        try {
            const res = await fetch("/api/admin/signout", {
                method: "POST",
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.messsage);
            } else {
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error.messsage);
        }
    };

    return (
        < Navbar fluid rounded className=" border-b-2 p-6 shadow-md bg-slate-200 " >
            <Navbar.Brand>
                <Link to="/">
                <Logo width1="w-10" width2="w-20" />
                </Link>
            </Navbar.Brand>
            <div>
                <div>
                    {currentUser ? "Welcome to the Dashboard" : "Login to the Dashboard"}
                </div>
            </div>
            <div className="flex md:order-2">
                {currentUser && (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt="User settings"
                                img="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                                rounded
                            />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">{currentUser?.username}</span>
                            <span className="block truncate text-sm font-medium">
                                {currentUser?.email}
                            </span>
                        </Dropdown.Header>

                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
                    </Dropdown>
                )}
            </div>
        </Navbar >
    );
}
