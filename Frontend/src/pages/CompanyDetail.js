import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchDetailsComapny } from "../reducer/Company_reducer";

const CompanyDetail = () => {
  const dispatch = useDispatch();

  const id = localStorage.getItem("itemid");

  useEffect(() => {
    dispatch(fetchDetailsComapny(id));
  }, [dispatch, id]);

  const result = useSelector(
    (state) => state.CompanyReducer && state.CompanyReducer.result
  );

  //  localStorage.setItem("comanyName",companyName)

  if (!result || !result.data) {
    return <p>Loading...</p>; // You might want to add a loading indicator
  }

  const {
    companyName,
    address,

    city,
    country,
    email,

    phoneNumber,
    postalCode,
    state,
  } = result.data["0"];

  return (
    <>
      <div className="bg-white p-6 rounded-md shadow-md">
        <div className="grid grid-cols-1 gap-10">
          <div>
            <h2 className="text-xl font-bold mb-2">{companyName}</h2>
            <p className="text-gray-700   whitespace-pre-line ">
              Address:{address}
            </p>
            <p className="text-gray-700">
              {city}, {state}, {postalCode}
            </p>
            <p className="text-gray-700">{country}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Contact Information</h2>
            <p className="text-gray-700">Email: {email}</p>
            <p className="text-gray-700">Phone: {phoneNumber}</p>
            {/* <p className="text-gray-700">Owner: {ownerName}</p>
            <p className="text-gray-700">Owner Email: {ownerEmail}</p>
            <p className="text-gray-700">Owner Phone: {ownerPhoneNumber}</p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyDetail;
