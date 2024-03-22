import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchDetailsComapny } from "../reducer/Company_reducer";
import { getbalancesheet } from "../reducer/billing_reducer";

const CompanyDetail = () => {
  const dispatch = useDispatch();

  const id = localStorage.getItem("itemid");

  useEffect(() => {
    dispatch(fetchDetailsComapny(id));
    dispatch(getbalancesheet());
  }, []);

  const result = useSelector(
    (state) => state.CompanyReducer && state.CompanyReducer.result
  );
  const balancesheetData = useSelector(
    (state) => state.BillingReducer.balancesheet?.data
  );
  console.log(balancesheetData);

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
      <div className="grid grid-cols-4 text-center gap-4">
        <div className="h-48 p-5 flex justify-center items-center flex-col bg-white">
          <p className="font-bold text-2xl">Inventory</p>
          <p className=" text-2xl">
            ₹{balancesheetData && balancesheetData.assets.inventory}
          </p>
        </div>
        <div className="h-48 p-5 flex justify-center items-center flex-col bg-white">
          <p className="font-bold text-2xl">Purchase</p>
          <p className=" text-2xl">
            ₹{balancesheetData && balancesheetData.Purchase}
          </p>
        </div>
        <div className="h-48 p-5 flex justify-center items-center flex-col bg-white">
          <p className="font-bold text-2xl">sales</p>
          <p className=" text-2xl">
            ₹{balancesheetData && balancesheetData.sales}
          </p>
        </div>
        <div className="h-48 p-5 flex justify-center items-center flex-col bg-white">
          <p className="font-bold text-2xl">P/L</p>
          <p className=" text-2xl">
            ₹{" "}
            {balancesheetData &&
              balancesheetData.sales - balancesheetData.Purchase < 0 &&
              "Loss"}
            {balancesheetData &&
              balancesheetData.sales - balancesheetData.Purchase >= 0 &&
              "Profit"}
            {balancesheetData &&
              Math.abs(balancesheetData.sales - balancesheetData.Purchase)}
          </p>
        </div>
      </div>

      {/* <div className="bg-white p-6 rounded-md shadow-md">
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
          
          </div>
        </div>
      </div> */}
    </>
  );
};

export default CompanyDetail;
