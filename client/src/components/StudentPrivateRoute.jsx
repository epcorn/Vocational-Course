import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function StudentPrivateRoute() {
    const { currentUser } = useSelector((state) => state.user);
    return currentUser ? <Outlet /> : <Navigate to="/login" />;
}
