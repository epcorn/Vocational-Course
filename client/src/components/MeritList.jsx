import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InfoTable } from "./InfoTable";

function MeritList() {
  const [student, setStudent] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchLinks = async () => {
      const res = await fetch(`/api/students/${id}`);
      const data = await res.json();
      if (res.ok) {
        setStudent(data.data);
      }
    };
    fetchLinks();
  }, [id]);
  return (
    <div className="max-w-6xl mx-auto p-3 flex flex-row flex-wrap gap-8 py-7">
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-gray-800 p-4 rounded-md shadow-md">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-yellow-800">
              Important Notice
            </p>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-sm leading-5 font-medium">
            Congratulations on your selection to our 1st Merit List.
          </p>
          <p className="mt-1 text-sm leading-5">
            You are requested to complete the admission formalities by paying
            the first part course fee via{" "}
            <em>Direct Bank Transfer / UPI-Bank Transfer</em>, kindly ensure
            that the payment is made within a specified time deadline to avoid
            any late fees or cancellations.
          </p>
          <p className="mt-1 text-sm leading-5">
            *During making payments kindly mention &quot;IPM&quot; in the
            payment narration so as making it easy for us to track the payments.
          </p>
          <p className="mt-1 text-sm leading-5">
            Once the payment is processed complete the data inputs on the
            hyperlink provided to the right side on the merit list and share
            relevant inputs and screenshots.
          </p>
          <p className="mt-2 text-sm font-medium">
            Standard Payment Details are below:
          </p>
          <ul className="list-disc ml-4 mt-1 text-sm leading-5">
            <li>Total course Fees – Rs. 27,000.00</li>
            <li>70% To Pay – Rs. 18,900.00</li>
            <li>+ Application Fees – Rs. 100.00</li>
            <li>= To Pay Total Fees– Rs. 19,000.00</li>
            <li>PAY TO Bank Name – Bank of Baroda</li>
            <li>PAY TO Account Number – 77910100000654</li>
            <li>PAY TO &quot;IFSC Code&quot; – BARB0VJSERA</li>
          </ul>
        </div>
      </div>
      <h1 className="w-full">
        <InfoTable
          name={student.details?.firstName}
          email={student.details?.email}
          address={student.details?.address}
          id={student?._id}
        />
      </h1>
    </div>
  );
}

export default MeritList;
