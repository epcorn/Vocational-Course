/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "./Loading";

export default function DashProfile() {
    const { currentUser, error } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        email: currentUser.email,
        password: ""
    });
    const [showModal, setShowModal] = useState(false);
    const [allowReset, setAllowReset] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`/api/students/sendOtp/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                setLoading(false);
                toast.error(data.message);
            } else {
                setLoading(false);
                toast.success(data.message);
                setShowModal(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const verifyOtp = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/students/verifyOtp/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success(data.message);
                setShowModal(false);
                setLoading(false);
                setFormData({
                    email: currentUser.email,
                    password: ""
                });
                toggleReset();
            } else {
                toast.error(data.message);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const toggleReset = () => {
        setAllowReset(state => !state);
    };

    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            {loading && <Loading />}
            <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full relative">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                        alt="user"
                        className={`rounded-full w-full h-full object-cover border-8 border-[#707270]`}
                    />
                </div>

                <TextInput
                    type="email"
                    id="email"
                    placeholder="email"
                    defaultValue={currentUser.email}
                    onChange={handleChange}
                    disabled
                />
                <TextInput
                    type="text"
                    id="password"
                    placeholder="Current Password"
                    onChange={handleChange}
                    disabled={!allowReset}

                />
                {
                    allowReset && (<TextInput
                        type="text"
                        id="newPassword"
                        placeholder="New Password"
                        onChange={handleChange}
                        disabled={!allowReset}

                    />)
                }
                <Button
                    type="submit"
                    gradientDuoTone="purpleToBlue"
                    outline
                    disabled={!allowReset}
                >
                    {allowReset ? "Send Otp" : "Update"}
                </Button>
                <div className=" text-red-600 font-bold text-right">
                    <span className=" cursor-pointer" onClick={toggleReset}>Reset Password</span>
                </div>
            </form>
            {error && (
                <Alert color="failure" className="mt-5">
                    {error}
                </Alert>
            )}
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size="md"
            >
                <Modal.Header>Enter the OTP here</Modal.Header>
                <Modal.Body>
                    <div className="max-w-lg mx-auto p-3 w-full text-center">
                        <TextInput
                            type="email"
                            id="otp"
                            placeholder="0000"
                            onChange={handleChange}
                        />
                        <Button className="w-full mt-2" onClick={verifyOtp}>Submit</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}