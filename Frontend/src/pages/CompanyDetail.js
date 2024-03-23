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
        <div class="flex items-center p-8 bg-white shadow-md rounded-lg">
          <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600  bg-blue-100 rounded-full mr-6">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="h-6 w-6 " stroke="currentColor">
            <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
          </svg>
          </div>
          <div>
            <span class="block text-2xl font-bold">₹{balancesheetData && balancesheetData.assets.inventory}</span>
            <span class="block text-gray-500">Inventory</span>
          </div>
        </div>
        <div class="flex items-center p-8 bg-white shadow-md rounded-lg">
          <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <span class="block text-2xl font-bold">₹{balancesheetData && balancesheetData.Purchase}</span>
            <span class="block text-gray-500">Purchase</span>
          </div>
        </div>
        <div class="flex items-center p-8 bg-white shadow-md rounded-lg">
          <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
          </div>
          <div>
            <span class="inline-block text-2xl font-bold">₹{balancesheetData && balancesheetData.sales}</span>
            <span class="block text-gray-500">sales</span>
          </div>
        </div>
        <div class="flex items-center p-8 bg-white shadow-md rounded-lg">
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
            <span class="block text-gray-500">P/L</span>
          </div>
        </div>
      </section>

      <div className="bg-white p-6 rounded-md shadow-md mt-4">
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
