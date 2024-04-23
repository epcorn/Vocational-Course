/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { Modal } from "flowbite-react";
import { Button } from "../components/Button";
import useLocalStorage from "../customHooks/useLocalStorage";


const Admission = () => {
  const [next, setNext] = useState("Personal Information");
  const [isLoading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [impInfo, setImpInfo] = useState({ firstName: "", email: "", phone: "" });
  const [form, setForm] = useLocalStorage("form", {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    alternatePhone: "",
    dob: "",
    gender: "",
    blood: "",
    disability: "No",
    nationality: "",
    religion: "",
    caste: "General",
    fatherName: "",
    motherName: "",
    income: "",
    guardianName: "",
    relationGuardian: "",
    incomeGuardian: "",
    address: "",
    city: "",
    pincode: "",
    percentage10: "",
    board10: "",
    percentage12: "",
    board12: "",
    graduationPercentage: "",
    graduationUnivercity: "",
    lastUniversity: "",
    passingYear: "",
    rollNo: "",
    regNo: "",
    best4: "",
    extraCourse: "",
    passportPics: [],
    aadharCard: [],
    castCertificate: [],
    marksheet10: [],
    marksheet12: [],
    marksheetGraduation: [],
    vocationalCerti: [],
    donePersonal: false,
    doneEducation: false,
    doneUpload: false,
    donePayment: false,
    paymentSS: "",
  });

  const handleClick = (e) => {
    e.preventDefault();

    if (e.target.name === "next") {
      setNext("Upload");
    }
    if (e.target.name === "prev") {
      setNext("Personal Information");
    }

  };

  const handlePersonalForm = (e) => {
    e.preventDefault();
    setForm((prev) => ({
      ...prev,
      donePersonal: true,
    }));
    setNext("Education");
  };

  const handleEducationForm = (e) => {
    e.preventDefault();
    setForm((prev) => ({
      ...prev,
      doneEducation: true,
    }));
    setNext("Upload");
  };


  const sendPostRequest = async () => {
    try {
      const response = await axios.post('/api/students/studentRegister', {
        form
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    const sendData = setTimeout(() => {
      axios.post('/api/students/studentRegister', { form });
    }, 3000);
    return () => clearTimeout(sendData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [impInfo]);



  const handleToEducation = (e) => {
    e.preventDefault();
    if (e.target.name === "prev") {
      setNext("Education");
    }
  };

  const submitApplication = async () => {
    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      setLoading(false);
      await sendPostRequest();
      toast.success("Application Submitted");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("There is some error, try again later");
    }
  };

  const handleUploadDocuments = () => {
    if (
      !form.marksheet10.length ||
      form.percentage12 !== "" && !form.marksheet12.length ||
      form.graduationPercentage !== "" && !form.marksheetGraduation.length ||
      !form.aadharCard.length ||
      !form.passportPics.length ||
      form.caste != "General" && !form.castCertificate.length
    ) {

      toast.error("Please upload all the required documents");
      return;
    }
    setForm((prev) => ({
      ...prev,
      doneUpload: true,
    }));
    setNext("Payment");
  };

  const uploadDocument = async ({ e, docName }) => {
    console.log(e.target.value);
    setLoading(true);
    try {
      const images = Array.from(e.target.files);
      const form = new FormData();
      images.forEach((image) => {
        form.append("images", image);
      });

      const res = await axios.post("/api/documentUpload", form);


      setForm((prev) => ({ ...prev, [docName]: res.data.imageLinks }));
      setLoading(false);
      toast.success("Document Uploaded");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Document Upload Failed");
    }
  };

  function handleImpInfoChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setImpInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  return (
    <div className="m-5">
      {isLoading && <Loading />}
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="flex items-center justify-center">
        <div className="w-full px-8 xl:w-10/12">
          <div className="bg-gray-100 py-5">

            <h1 className="text-c#c026d3 pb-5 text-center text-lg font-semibold text-teal-700">
              Application form for admission to Pest Control Application
              Technology
            </h1>
            <div className={`flex flex-wrap items-center justify-center`}>
              <div className="relative mt-4 h-16 w-52 md:mt-0">
                <img
                  src={`${form.donePersonal ? "https://i.ibb.co/wNZ4nzy/Steps2.png" : "https://i.ibb.co/c2k4Gbr/Steps3.png"}`}
                  alt="step1"
                  className="h-full w-full"
                />
                <div className={`absolute inset-0 m-0 flex w-full flex-col items-center justify-center px-6 ${form.donePersonal}`}>
                  <p className="w-full text-sm font-medium leading-4">
                    Sign Up
                  </p>
                  <p className="mt-1 w-full text-xs leading-none">
                    Personal information
                  </p>
                </div>
              </div>
              <div className="relative mt-4 h-16 w-52 md:mt-0">
                <img
                  src={`${form.doneEducation ? "https://i.ibb.co/wNZ4nzy/Steps2.png" : "https://i.ibb.co/c2k4Gbr/Steps3.png"}`}
                  alt="step2"
                  className="h-full w-full"
                />
                <div className="absolute inset-0 m-0 flex w-full flex-col items-center justify-center px-6">
                  <p className="w-full text-sm font-medium leading-4 ">
                    Education
                  </p>
                  <p className="mt-1 w-full text-xs leading-none ">
                    Educational details
                  </p>
                </div>
              </div>
              <div className="relative mt-4 h-16 w-52 md:mt-0">
                <img
                  src={`${form.doneUpload ? "https://i.ibb.co/wNZ4nzy/Steps2.png" : "https://i.ibb.co/c2k4Gbr/Steps3.png"}`}
                  alt="step3"
                  className="h-full w-full"
                />
                <div className="absolute inset-0 m-0 flex w-full flex-col items-center justify-center px-6">
                  <p className="w-full text-sm font-medium leading-4 text-gray-700">
                    Documents
                  </p>
                  <p className="mt-1 w-full text-xs leading-none text-gray-500">
                    Upload documents
                  </p>
                </div>
              </div>
              <div className="relative mt-4 h-16 w-52 lg:mt-0">
                <img
                  src={`${form.donePayment ? "https://i.ibb.co/wNZ4nzy/Steps2.png" : "https://i.ibb.co/c2k4Gbr/Steps3.png"}`}
                  alt="step4"
                  className="h-full w-full"
                />
                <div className="absolute inset-0 m-0 flex w-full flex-col items-center justify-center px-6">
                  <p className="w-full text-sm font-medium leading-4 text-gray-700">
                    Payment
                  </p>
                  <p className="mt-1 w-full text-xs leading-none text-gray-500">
                    Final Payment
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="xl:px-24">
            {next === "Personal Information" ? (
              <form onSubmit={handlePersonalForm} >
                <h1 className="my-8 pr-2 text-center text-2xl font-medium leading-5 text-gray-800">
                  Personal Information
                </h1>
                <div className="flex justify-between border-b border-gray-200 pb-8 lg:flex">
                  <div>
                    <div className="mt-4 items-center md:flex lg:mt-0">
                      <div className="md:w-64">
                        <label
                          className="text-sm leading-none text-gray-800"
                          id="firstName"
                        >
                          First Name
                          <span className="text-red-500 required-dot ml-0.5">
                            *
                          </span>
                        </label>
                        <input
                          required
                          type="text"
                          name="firstName"
                          value={form.firstName}
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          aria-labelledby="firstName"
                          placeholder="John"
                          maxLength={30}
                          onChange={handleImpInfoChange}
                        />
                      </div>
                      <div className="ml-10 md:w-64">
                        <label
                          className="text-sm leading-none text-gray-800"
                          id="middleName"
                        >
                          Middle Name

                        </label>
                        <input
                          type="text"
                          value={form.middleName}
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          aria-labelledby="middleName"
                          placeholder="Michel"
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              middleName: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="ml-10 md:w-64">
                        <label
                          className="text-sm leading-none text-gray-800"
                          id="lastName"
                        >
                          Last Name
                          <span className="text-red-500 required-dot ml-0.5">
                            *
                          </span>
                        </label>
                        <input
                          required
                          type="text"
                          value={form.lastName}
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          aria-labelledby="lastName"
                          placeholder="Doe"
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              lastName: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-8 items-center md:flex">
                      <div className="md:w-64">
                        <label className="text-sm leading-none text-gray-800">
                          Email address
                          <span className="text-red-500 required-dot ml-0.5">
                            *
                          </span>
                        </label>
                        <input
                          required
                          type="email"
                          name="email"
                          value={form.email}
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          aria-labelledby="emailAddress"
                          placeholder="youremail@example.com"
                          onChange={handleImpInfoChange}
                        />
                      </div>
                      <div className="mt-4 md:ml-10 md:mt-0 md:w-64">
                        <label className="text-sm leading-none text-gray-800">
                          Phone number
                          <span className="text-red-500 required-dot ml-0.5">
                            *
                          </span>
                        </label>
                        <input
                          required
                          type="number"
                          name="phone"
                          value={form.phone}
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          aria-labelledby="phone"
                          placeholder="123-1234567"
                          onChange={handleImpInfoChange}
                        />
                      </div>
                      <div className="mt-4 md:ml-10 md:mt-0 md:w-64">
                        <label className="text-sm leading-none text-gray-800">
                          Alternate Phone number
                        </label>
                        <input
                          type="number"
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          aria-labelledby="phone"
                          placeholder="123-1234567"
                          value={form.alternatePhone}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              alternatePhone: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-8 items-center md:flex">
                      <div className="md:w-56">
                        <label className="text-sm leading-none text-gray-800">
                          Date Of Birth
                          <span className="text-red-500 required-dot ml-0.5">
                            *
                          </span>
                        </label>
                        <input
                          required
                          type="date"
                          value={form.dob}
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          aria-labelledby="emailAddress"
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              dob: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="ml-10 md:w-44">
                        <label
                          className="text-sm leading-none text-gray-800"
                          id="gender"
                        >
                          Gender
                          <span className="text-red-500 required-dot ml-0.5">
                            *
                          </span>
                        </label>
                        <select
                          required
                          type="select"
                          value={form.gender}
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          aria-labelledby="emailAddress"
                          placeholder="Select"
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              gender: e.target.value,
                            }))
                          }
                        >
                          <option>Select</option>
                          <option>Male</option>
                          <option>Female</option>
                          <option>Prefer Not To Say</option>
                        </select>
                      </div>
                      <div className="ml-10 md:w-32">
                        <label className="text-sm leading-none text-gray-800">
                          Blood Group
                        </label>
                        <input
                          type="text"
                          value={form.blood}
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          placeholder="A+"
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              blood: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="ml-10 md:w-44">
                        <label
                          className="text-sm leading-none text-gray-800"
                          id="emailAddress"
                        >
                          Do You Have A Disability?
                        </label>
                        <select
                          type="select"
                          value={form.disability}
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          aria-labelledby="emailAddress"
                          placeholder="Select"
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              disability: e.target.value,
                            }))
                          }
                        >
                          <option>No</option>
                          <option>Yes</option>
                        </select>
                      </div>
                    </div>
                    <div className="items-center md:flex lg:mt-8">
                      <div className="md:w-64">
                        <label
                          className="text-sm leading-none text-gray-800"
                          id="nationality"
                        >
                          Nationality
                          <span className="text-red-500 required-dot ml-0.5">
                            *
                          </span>
                        </label>
                        <input
                          required
                          type="text"
                          value={form.nationality}
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          aria-labelledby="firstName"
                          placeholder="Indian"
                          defaultValue="Indian"
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              nationality: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="md:ml-10 md:w-64">
                        <label
                          className="text-sm leading-none text-gray-800"
                          id="religion"
                        >
                          Religion
                          <span className="text-red-500 required-dot ml-0.5">
                            *
                          </span>
                        </label>
                        <input
                          required
                          type="text"
                          value={form.religion}
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          aria-labelledby="firstName"
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              religion: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="ml-10 md:w-44">
                        <label
                          className="text-sm leading-none text-gray-800"
                          id="caste"
                        >
                          Caste
                        </label>
                        <select
                          type="select"
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          aria-labelledby="emailAddress"
                          placeholder="Select"
                          value={form.caste}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              caste: e.target.value,
                            }))
                          }
                        >
                          <option>General</option>
                          <option>SC</option>
                          <option>ST</option>
                          <option>OBC</option>
                        </select>
                      </div>
                    </div>
                    <div className="items-center md:flex lg:mt-8">
                      <div className="md:w-64">
                        <label
                          className="text-sm leading-none text-gray-800"
                          id="fatherFirstName"
                        >
                          Father Full Name
                        </label>
                        <input
                          type="text"
                          value={form.fatherName}
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          aria-labelledby="firstName"
                          placeholder="John Doe"
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              fatherName: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="ml-10 md:w-64">
                        <label
                          className="text-sm leading-none text-gray-800"
                          id="fatherMiddleName"
                        >
                          Mother Full Name
                        </label>
                        <input
                          type="text"
                          value={form.motherName}
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          aria-labelledby="middleName"
                          placeholder="John Doe"
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              motherName: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="ml-10 md:w-64">
                        <label
                          className="text-sm leading-none text-gray-800"
                          id="motherMiddleName"
                        >
                          Annual Income Of Parents
                        </label>
                        <input
                          type="text"
                          value={form.income}
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          aria-labelledby="middleName"
                          placeholder="In Rupees"
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              income: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="items-center md:flex lg:mt-8">
                      <div className="md:w-64">
                        <label
                          className="text-sm leading-none text-gray-800"
                          id="motherFirstName"
                        >
                          Guardian Full Name
                        </label>
                        <input
                          type="text"
                          value={form.guardianName}
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          aria-labelledby="firstName"
                          placeholder="John Doe"
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              guardianName: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="ml-10 md:w-64">
                        <label
                          className="text-sm leading-none text-gray-800"
                          id="motherMiddleName"
                        >
                          Relationship With Guardian
                        </label>
                        <input
                          type="text"
                          value={form.relationGuardian}
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          aria-labelledby="middleName"
                          placeholder="Son/Daughter"
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              relationGuardian: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="ml-10 md:w-64">
                        <label
                          className="text-sm leading-none text-gray-800"
                          id="motherMiddleName"
                        >
                          Annual Income Of Guardian
                        </label>
                        <input
                          type="number"
                          value={form.incomeGuardian}
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          aria-labelledby="middleName"
                          placeholder="In Rupees"
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              incomeGuardian: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-8 items-center md:flex">
                      <div className="md:w-80">
                        <label
                          className="text-sm leading-none text-gray-800"
                          id="firstName"
                        >
                          Full Address
                          <span className="text-red-500 required-dot ml-0.5">
                            *
                          </span>
                        </label>
                        <textarea
                          required
                          type="name"
                          value={form.address}
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          aria-labelledby="firstName"
                          placeholder="Your Full Address"
                          rows={5}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              address: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="ml-10 md:w-56">
                        <label
                          className="text-sm leading-none text-gray-800"
                          id="firstName"
                        >
                          City
                          <span className="text-red-500 required-dot ml-0.5">
                            *
                          </span>
                        </label>
                        <input
                          required
                          type="name"
                          value={form.city}
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          aria-labelledby="firstName"
                          placeholder="Mumbai"
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              city: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="ml-10 md:w-56">
                        <label
                          className="text-sm leading-none text-gray-800"
                          id="firstName"
                        >
                          Pincode
                          <span className="text-red-500 required-dot ml-0.5">
                            *
                          </span>
                        </label>
                        <input
                          required
                          type="number"
                          value={form.pincode}
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          aria-labelledby="firstName"
                          placeholder="400054"
                          pattern="[0-9]{6}"
                          maxLength="6"
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              pincode: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="w-full flex justify-center gap-5">
                      <button
                        type="submit"
                        name="next"
                        className="mt-4 rounded-lg bg-blue-700 px-4 py-1 text-lg text-white hover:bg-blue-600"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            ) : next === "Education" ? (
              <form onSubmit={handleEducationForm}>
                <h1 className="mb-4 mt-5 text-center text-2xl font-medium leading-5 text-gray-800">
                  Educational Information
                </h1>
                <div className="flex justify-between border-b border-gray-200 pb-8 lg:flex">
                  <div>
                    <div className="items-center md:flex lg:mb-8">
                      <div className="md:w-36">
                        <label className="text-sm leading-none text-gray-800">
                          10th Percentage
                          <span className="text-red-500 required-dot ml-0.5">
                            *
                          </span>
                        </label>
                        <input
                          type="number"
                          value={form.percentage10}
                          required
                          min={0}
                          max={100}
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              percentage10: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="ml-10 md:w-52">
                        <label className="text-sm leading-none text-gray-800">
                          10th Board Name
                          <span className="text-red-500 required-dot ml-0.5">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.board10}
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              board10: e.target.value,
                            }))
                          }
                          placeholder="Board Name Of 10th"
                        />
                      </div>
                      <div className="pl-10  md:w-48">
                        <label className="text-sm leading-none text-gray-800">
                          10+2 Percentage

                        </label>
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={form.percentage12}
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              percentage12: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="ml-10 md:w-52">
                        <label className="text-sm leading-none text-gray-800">
                          10+2 Board Name

                        </label>
                        <input
                          type="text"
                          value={form.board12}
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              board12: e.target.value,
                            }))
                          }
                          placeholder="Board Name Of 10+2"
                        />
                      </div>
                    </div>
                    <div className="items-center md:flex lg:mb-8">
                      <div className="md:w-52">
                        <label
                          className="text-sm leading-none text-gray-800"
                        >
                          Graduation Percentage
                        </label>
                        <input
                          value={form.graduationPercentage}
                          type="number"
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              graduationPercentage: e.target.value,
                            }))
                          }
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          aria-labelledby="firstName"
                        />
                      </div>
                      <div className="ml-10 md:w-56">
                        <label
                          className="text-sm leading-none text-gray-800"
                        >
                          Graduation University Name
                        </label>
                        <input
                          type="text"
                          value={form.graduationUnivercity}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              graduationUnivercity: e.target.value,
                            }))
                          }
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          aria-labelledby="middleName"
                          placeholder="Your university name"
                        />
                      </div>
                    </div>
                    <div className="mt-4 items-center md:flex lg:mt-0">
                      <div className="w-full">
                        <label className="text-sm leading-none text-gray-800">
                          Name of the last University / Council / Board
                          Examination passed

                        </label>
                        <input
                          type="text"
                          value={form.lastUniversity}
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              lastUniversity: e.target.value,
                            }))
                          }
                          placeholder="West Bengal University"
                        />
                      </div>
                      <div className="ml-10 md:w-64">
                        <label className="text-sm leading-none text-gray-800">
                          Year Of Passing

                        </label>
                        <input
                          type="text"
                          value={form.passingYear}
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              passingYear: e.target.value,
                            }))
                          }
                          placeholder="2023"
                        />
                      </div>
                      <div className="ml-10 md:w-64">
                        <label className="text-sm leading-none text-gray-800">
                          Roll Number
                        </label>
                        <input
                          type="text"
                          value={form.rollNo}
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              rollNo: e.target.value,
                            }))
                          }
                          placeholder="123"
                        />
                      </div>
                    </div>
                    <div className="items-center md:flex lg:mt-8">
                      <div className="md:w-52">
                        <label className="text-sm leading-none text-gray-800">
                          Registration No. with year
                        </label>
                        <input
                          type="text"
                          value={form.regNo}
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              regNo: e.target.value,
                            }))
                          }
                          placeholder=""
                        />
                      </div>
                      <div className="ml-10 md:w-64">
                        <label className="text-sm leading-none text-gray-800">
                          Marks Obtained (best of 4 subjects)
                          <span className="text-red-500 required-dot ml-0.5">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.best4}
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              best4: e.target.value,
                            }))
                          }
                          placeholder="Marks obtained / total marks"
                        />
                      </div>
                    </div>
                    <div className="items-center md:flex lg:mt-8">
                      <div className="">
                        <label className="text-sm leading-none text-gray-800">
                          Name of the any other vocational course(if attended)
                        </label>
                        <input
                          type="text"
                          value={form.extraCourse}
                          className="mt-3 w-full rounded border border-gray-200 bg-gray-100 p-3 text-sm font-medium leading-none text-gray-800 focus:border-gray-600 focus:outline-none"
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              extraCourse: e.target.value,
                            }))
                          }
                          placeholder="Carpenter, Electrician"
                        />
                      </div>
                    </div>
                    <div className="w-full flex justify-center items-center gap-5">
                      <button
                        type="button"
                        onClick={handleClick}
                        name="prev"
                        className="mt-4 rounded-lg bg-blue-700 px-4 py-1 text-lg text-white hover:bg-blue-600"
                      >
                        Back
                      </button>
                      <button
                        className="mt-5 rounded-lg bg-blue-700 px-4 py-1 text-lg text-white hover:bg-blue-600"
                        type="submit"
                      >
                        Next
                      </button>
                    </div>


                  </div>
                </div>
              </form>
            ) : next === "Upload" ? (
              <>
                <h1 className="mt-5 text-center text-2xl font-medium leading-5 text-gray-800">
                  Upload Documents {isLoading && "Uploading..."}
                  {isLoading && <Loading />}
                </h1>
                <div className="flex justify-between border-b border-gray-200 pb-8 lg:flex">
                  <div>
                    <div className="items-center md:flex lg:mt-8">
                      <div className="w-64 bg-green-200 rounded-sm">
                        <label
                          className="text-sm font-medium leading-none text-gray-800"
                          id="university"
                        >
                          Passport Size Photo
                          <span className="text-red-500 required-dot ml-0.5">
                            *
                          </span>
                        </label>
                        <input
                          type="file"
                          multiple
                          className="mt-1"
                          onChange={(e) =>
                            uploadDocument({ e, docName: "passportPics" })
                          }
                        />
                      </div>
                      <div className="ml-10 md:w-64">
                        <div className="w-64">
                          <label
                            className="text-sm font-medium leading-none text-gray-800"
                            id="university"
                          >
                            Address Proof (Aadhar Card)
                            <span className="text-red-500 required-dot ml-0.5">
                              *
                            </span>
                          </label>
                          <input
                            type="file"
                            className="mt-1"
                            multiple
                            onChange={(e) =>
                              uploadDocument({ e, docName: "aadharCard" })
                            }
                          />
                        </div>
                      </div>
                      {form.caste != "General" && (
                        <div className="ml-10 md:w-64">
                          <div className="w-72">
                            <label
                              className="text-sm font-medium leading-none text-gray-800"
                              id="university"
                            >
                              Cast certificate if any
                              <span className="text-red-500 required-dot ml-0.5">
                                *
                              </span>
                            </label>
                            <input
                              type="file"
                              className="mt-1"
                              multiple
                              onChange={(e) =>
                                uploadDocument({ e, docName: "castCertificate" })
                              }
                            />
                          </div>
                        </div>
                      )}

                    </div>
                    <div className="items-center md:flex lg:mt-8">
                      <div className="w-64">
                        <label
                          className="text-sm font-medium leading-none text-gray-800"
                          id="university"
                        >
                          10th Marksheet
                          <span className="text-red-500 required-dot ml-0.5">
                            *
                          </span>
                        </label>
                        <input
                          type="file"
                          className="mt-1"
                          multiple
                          onChange={(e) =>
                            uploadDocument({ e, docName: "marksheet10" })
                          }
                        />
                      </div>
                      {form.percentage12 != "" && (
                        <div className="w-64 ml-10">
                          <label
                            className="text-sm font-medium leading-none text-gray-800"
                            id="university"
                          >
                            10+2 Marksheet
                            <span className="text-red-500 required-dot ml-0.5">
                              *
                            </span>
                          </label>
                          <input
                            type="file"
                            className="mt-1"
                            multiple
                            onChange={(e) =>
                              uploadDocument({ e, docName: "marksheet12" })
                            }
                          />
                        </div>
                      )}
                      {form.graduationPercentage != "" && (<div className="ml-10 md:w-64">
                        <div className="w-64">
                          <label
                            className="text-sm font-medium leading-none text-gray-800"
                            id="university"
                          >
                            Graduation Marksheet
                            <span className="text-red-500 required-dot ml-0.5">
                              *
                            </span>
                          </label>
                          <input
                            type="file"
                            className="mt-1"
                            multiple
                            onChange={(e) =>
                              uploadDocument({ e, docName: "marksheetGraduation" })
                            }
                          />
                        </div>
                      </div>
                      )}
                    </div>
                    <div className="md:w-64 mt-8">
                      <div className="w-72">
                        <label
                          className="text-sm font-medium leading-none text-gray-800"
                          id="university"
                        >
                          Vocational Certification If Any
                        </label>
                        <input
                          type="file"
                          className="mt-1"
                          multiple
                          onChange={(e) =>
                            uploadDocument({ e, docName: "vocationalCerti" })
                          }
                        />
                      </div>
                    </div>
                    <div className="w-full flex justify-center gap-5 ">
                      <button
                        className="mt-5 rounded-lg bg-blue-700 px-4 py-1 text-lg text-white hover:bg-blue-600"
                        onClick={handleToEducation}
                        name="prev"
                      >
                        Prev
                      </button>
                      <button
                        className="mt-5 rounded-lg bg-blue-700 px-4 py-1 text-lg text-white hover:bg-blue-600"
                        onClick={handleUploadDocuments}
                      >
                        Next
                      </button>
                    </div>

                  </div>
                </div>
              </>
            ) : (
              <div className="my-4 flex items-center justify-center">
                <div>
                  <h1 className="text-center text-2xl font-medium leading-5 text-gray-800">
                    Payment
                  </h1>
                  <label className="my-5 mb-3 flex w-[420px] space-x-2">
                    <input
                      type="checkbox"
                      name="checked-demo"
                      className="form-tick bg-check mr-3 mt-1 h-5 w-12 appearance-none rounded-md border border-gray-300 bg-white checked:border-transparent checked:bg-green-600 focus:outline-none"
                    />
                    <span className="font-normal">
                      Hereby i declare that the information & documents provided
                      are true, complete and correct to the best of my knowledge
                      and belief.
                    </span>
                  </label>
                  <button
                    className="mt-8 ml-20 rounded-lg bg-green-700 px-4 py-1 text-lg text-white hover:bg-blue-600"
                    onClick={() => setOpenModal(true)}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
          <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Payment Details</Modal.Header>
            <Modal.Body>
              <p className=' text-center text-red-500'>Rs: 100/- APPLICATION FORM FEES</p>
              <div className="space-y-6 border border-gray-900 p-4 rounded-md">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  <span>Name :</span>
                  <span>Serampore College Certificate course on Intigrated Pest Management </span>
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  <span>A/C :</span>
                  <span>77910100008083</span>
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  <span>IFSC :</span>
                  <span>BARB0VJSERA</span>
                </p>
              </div>

              <div className='mt-5'>
                <div className="w-64">
                  <label
                    className="text-sm font-medium leading-none text-gray-800"
                    id="university"
                  >
                    Payment Screenshot
                    <span className="text-red-500 required-dot ml-0.5">
                      *
                    </span>
                  </label>
                  <input
                    type="file"
                    className="mt-1"
                    multiple
                    onChange={(e) =>
                      uploadDocument({ e, docName: "paymentSS" })
                    }
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              {
                form.paymentSS !== "" && (
                  <Button onClick={() => [setOpenModal(false), submitApplication()]}>Sumit</Button>
                )
              }
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};
export default Admission;
