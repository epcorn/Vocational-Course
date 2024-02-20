import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Alert, Label, Spinner, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
    signInStart,
    signInFailure,
    signInSuccess,
} from "../redux/user/userSlice";
import { Logo } from "../components/Logo";

export default function SignIn() {
    const [formData, setFormData] = useState({});
    const { loading, error: errorMessage } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    console.log(pathname);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            return dispatch(signInFailure("Please fill out all fields"));
        }

        try {
            dispatch(signInStart());
            if (pathname === "/admin/login") {
                var res = await fetch("/api/admins/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });

                const data = await res.json();
                if (data.success === false) {
                    dispatch(signInFailure(data.message));
                }

                if (res.ok) {
                    dispatch(signInSuccess(data));
                    if (data.isAdmin) {
                        navigate("/admin/dashboard/dash");
                    } else {
                        navigate("/admin/login");
                    }
                }
            }
            if (pathname === "/login") {
                // Simulating a fake delay of 3 seconds
                await new Promise(resolve => setTimeout(resolve, 3000));

                // Simulating successful login response
                const fakeData = { success: true, message: "Fake login success message", user: { /* your user data here */ } };
                dispatch(signInSuccess(fakeData));
                // Redirect to the appropriate page after successful login
                navigate("/");
            }
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    };

    return (
        <div className=" min-h-screen mt-20">
            <div className=" flex p-3 max-w-3xl mx-auto flex-col sm:flex-row items-center gap-5">
                {/* left */}
                <div className=" flex-1">
                    <Link to="/">
                        <Logo className="h-12 w-auto text-slate-900" />
                    </Link>
                </div>
                {/* right */}
                <div className=" flex-1">
                    <form className=" flex flex-col gap-4" onSubmit={handleSubmit}>

                        <div className="">
                            <Label value="Your email" />
                            <TextInput
                                type="email"
                                placeholder="name@gmail.com"
                                id="email"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="">
                            <Label value="Your password" />
                            <TextInput
                                type="password"
                                placeholder="********"
                                id="password"
                                onChange={handleChange}

                            />
                        </div>
                        <button
                            className=" h-9 bg-gray-500 rounded-lg"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Spinner size="sm" />
                                    <span className=" pl-3">Loading...</span>
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>
                    {errorMessage && (
                        <Alert className="mt-5" color="failure">
                            {errorMessage}
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    );
}
