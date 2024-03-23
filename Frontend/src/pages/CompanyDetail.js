import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchDetailsComapny } from "../reducer/Company_reducer";
import { getbalancesheet } from "../reducer/billing_reducer";

const CompanyDetail = () => {
  const dispatch = useDispatch();

  const id = localStorage.getItem("itemid");

  useEffect(() => {
    dispatch(getbalancesheet());
    dispatch(fetchDetailsComapny(id));
  }, []);

  const result = useSelector(
    (state) => state.CompanyReducer && state.CompanyReducer.result
  );
  const balancesheetData = useSelector(
    (state) => state.BillingReducer.balancesheet?.data
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
      {/* <div className="grid grid-cols-4 text-center gap-4">
        <div className="h-48 p-5 flex justify-center items-center flex-col bg-white rounded-md shadow-md">
          <p className="font-bold text-2xl">Inventory</p>
          <p className=" text-2xl">
            ₹{balancesheetData && balancesheetData.assets.inventory}
          </p>
        </div>
        <div className="h-48 p-5 flex justify-center items-center flex-col bg-white rounded-md shadow-md">
          <p className="font-bold text-2xl">Purchase</p>
          <p className=" text-2xl">
            ₹{balancesheetData && balancesheetData.Purchase}
          </p>
        </div>
        <div className="h-48 p-5 flex justify-center items-center flex-col bg-white rounded-md shadow-md">
          <p className="font-bold text-2xl">sales</p>
          <p className=" text-2xl">
            ₹{balancesheetData && balancesheetData.sales}
          </p>
        </div>
        <div className="h-48 p-5 flex justify-center items-center flex-col bg-white rounded-md shadow-md">
          <p className="font-bold text-2xl">P/L</p>
          <p className=" text-2xl">
            {balancesheetData &&
              balancesheetData.sales - balancesheetData.Purchase < 0 &&
              "Loss"}
            {balancesheetData &&
              balancesheetData.sales - balancesheetData.Purchase >= 0 &&
              "Profit"}{" "}
            ₹
            {balancesheetData &&
              Math.abs(balancesheetData.sales - balancesheetData.Purchase)}
          </p>
        </div>
      </div> */}
           <section class="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div class="flex items-center p-8 bg-white shadow rounded-lg">
          <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <span class="block text-2xl font-bold">₹{balancesheetData && balancesheetData.assets.inventory}</span>
            <span class="block text-gray-500">Inventory</span>
          </div>
        </div>
        <div class="flex items-center p-8 bg-white shadow rounded-lg">
          
          <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
          </div>
          <div>
            <span class="block text-2xl font-bold">₹{balancesheetData && balancesheetData.Purchase}</span>
            <span class="block text-gray-500">Purchase</span>
          </div>
        </div>
        <div class="flex items-center p-8 bg-white shadow rounded-lg">
        <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <span class="inline-block text-2xl font-bold">₹{balancesheetData && balancesheetData.sales}</span>
            <span class="block text-gray-500">sales</span>
          </div>
        </div>
        <div class="flex items-center p-8 bg-white shadow rounded-lg">
          <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <span class="block text-2xl font-bold">            {balancesheetData &&
              balancesheetData.sales - balancesheetData.Purchase < 0 &&
              "Loss"}
            {balancesheetData &&
              balancesheetData.sales - balancesheetData.Purchase >= 0 &&
              "Profit"}{" "}
            ₹
            {balancesheetData &&
              Math.abs(balancesheetData.sales - balancesheetData.Purchase)}</span>
            <span class="block text-gray-500">Profit / Loss</span>
          </div>
        </div>
      </section>

      <div className="bg-white p-6 rounded-md shadow-md mt-6">
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
      </div>
    </>
  );
};

export default CompanyDetail;
