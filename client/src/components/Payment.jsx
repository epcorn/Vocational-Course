/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Payment = ({ id, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    accountName: "",
    bankName: "",
    paymentType: "bank",
    utr: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === "file" ? e.target.files[0] : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("accountName", formData.accountName);
    formDataToSend.append("bankName", formData.bankName);
    formDataToSend.append("paymentType", formData.paymentType);
    formDataToSend.append("utr", formData.utr);
    if (formData.file) {
      formDataToSend.append("file", formData.file);
    }

    if (!formData.utr && !formData.file) {
      toast.error("Please provide either UTR or Bank Receipt/Screenshot");
      return;
    }
    const postData = async () => {
      const res = await fetch(`/api/students/${id}`, {
        method: "POST",
        body: formDataToSend,
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        onClose();
        navigate("/");
        setFormData({
          accountName: "",
          bankName: "",
          paymentType: "bank",
          utr: "",
          file: null,
        });
      } else {
        toast.error("Uploading data failed try again letter");
      }
    };

    postData();
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer position="top-center" autoClose={3000} />

      <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="mb-4">
          <label
            htmlFor="accountName"
            className="block text-sm font-medium text-gray-700"
          >
            Paid from: Account Name
          </label>
          <input
            type="text"
            id="accountName"
            name="accountName"
            value={formData.accountName}
            onChange={handleChange}
            autoComplete="off"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="bankName"
            className="block text-sm font-medium text-gray-700"
          >
            Paid From: Bank Name
          </label>
          <input
            type="text"
            id="bankName"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            autoComplete="off"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Type
          </label>
          <div className="flex items-center">
            <input
              type="radio"
              id="paymentTypeBank"
              name="paymentType"
              value="bank"
              checked={formData.paymentType === "bank"}
              onChange={handleChange}
              autoComplete="off"
              className="mr-2"
            />
            <label htmlFor="paymentTypeBank" className="mr-4">
              Bank
            </label>
            <input
              type="radio"
              id="paymentTypeUPI"
              name="paymentType"
              value="upi"
              checked={formData.paymentType === "upi"}
              onChange={handleChange}
              autoComplete="off"
              className="mr-2"
            />
            <label htmlFor="paymentTypeUPI">UPI</label>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="utr"
            className="block text-sm font-medium text-gray-700"
          >
            UTR
          </label>
          <input
            type="text"
            id="utr"
            name="utr"
            autoComplete="off"
            value={formData.utr}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="file"
            className="block text-sm font-medium text-gray-700"
          >
            Bank Receipt/Screenshot
          </label>
          <input
            type="file"
            id="file"
            name="file"
            autoComplete="off"
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Payment;
