import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import Home from "./pages/Home";
import Admission from "./pages/Admission";
import Login from "./adminComponents/Login";
import Dashboard from "./pages/Dashboard";
import AdminHeader from "./adminComponents/AdminHeader";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import AdminPrivateRoute from "./adminComponents/AdminPrivateRoute";
import { useRef, useState } from "react";
import { Alert, Label, Modal, TextInput } from "flowbite-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import StudDash from "./components/StudDash";
import StudentPrivateRoute from "./components/StudentPrivateRoute";
import MeritList from "./components/MeritList";

function App() {
  const Layout = () => {
    const [hideOverlay, setHideOverlay] = useState(() => {
      const visited = window.localStorage.getItem("visited");
      return visited ? false : true;
    });

    const [form, setForm] = useState(null);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const emailInputRef = useRef(null);

    function validatePhone(field) {
      if (field.match(/^\d{10}/)) {
        return true;
      }
      return false;
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (validatePhone(form.phone)) {
        try {
          // eslint-disable-next-line no-unused-vars
          const res = await axios.post("/api/visitors/", form);
          window.localStorage.setItem("visited", true);
          setHideOverlay(false);
        } catch (error) {
          console.log(error);
          toast.error("There is some error, try again later");
        }
      } else {
        setError(true);
        setErrorMessage("Enter valid number!");
      }
    };

    const handleChange = (e) => {
      setError(false);
      setForm((prev) => ({
        ...prev,
        [e.target.name]: e.target.value, // Use square brackets to dynamically set the property name
      }));
    };

    return (
      <>
        <div></div>
        <Header />
        <div className="">
          <Outlet />
        </div>
        <Footer />
        {hideOverlay && (
          <Modal
            show={hideOverlay}
            popup
            size="lg"
            initialFocus={emailInputRef}
            className="backdrop-filter backdrop-blur-lg"
          >
            <Modal.Body>
              <ToastContainer position="top-center" autoClose={3000} />
              <form
                className=" flex flex-col p-4  gap-4"
                onSubmit={handleSubmit}
              >
                <div className="">
                  <Label value="Your email" />
                  <TextInput
                    type="email"
                    placeholder="name@gmail.com"
                    id="email"
                    name="email"
                    ref={emailInputRef}
                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <Label value="Your phone" />
                  <TextInput
                    type="text"
                    placeholder=""
                    id="phone"
                    name="phone"
                    onChange={handleChange}
                  />
                </div>
                <button
                  className=" h-9 bg-green-500 rounded-lg hover:bg-green-400"
                  type="submit"
                >
                  Submit
                </button>
                {error && (
                  <Alert className="mt-5" color="failure">
                    {errorMessage}
                  </Alert>
                )}
              </form>
            </Modal.Body>
          </Modal>
        )}
      </>
    );
  };
  const LayoutB = () => {
    return (
      <>
        <AdminHeader />
        <div>
          <Outlet />
        </div>
      </>
    );
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />,
          <Route path="admission" element={<Admission />} />
          <Route path="meritList/:id" element={<MeritList />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<StudentPrivateRoute />}>
            <Route path="dash" element={<StudDash />} />
          </Route>
        </Route>
        <Route path="/admin" element={<LayoutB />}>
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<AdminPrivateRoute />}>
            <Route path="dash" element={<Dashboard />} />
          </Route>
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
