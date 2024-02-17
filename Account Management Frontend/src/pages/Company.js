import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Company.css";
import { company, companyAction } from "../reducer/Company_reducer";
import { validGst, validPhone, Validpostcode, validpan } from "./Regex";
import coutry from "./country";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DateRangePicker } from "rsuite";

import { useNavigate } from "react-router-dom";

const Company = () => {
  const [Inputs, setInputs] = useState({
    date: [null, null],
    companyName: "",
    gstNumber: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    ownerName: "",
    pan: "",
    purchaseStock: "",
    ownerEmail: "",
    ownerPhoneNumber: "",
    businessType: "",
  });
  const handleDateChange = (value) => {
    setInputs((prevInputs) => ({ ...prevInputs, date: value }));
  };
  const countryList = Object.values(coutry);
  const successToastPosition = "top-center";
  const errorToastPosition = "top-right";
  const [selectedCountry, setSelectedCountry] = useState("");
  const handelchange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const [valid, setValid] = useState({
    phonevalid: false,
    gstvalid: false,
    postCodevalid: false,
    panvalid: false,
  });

  const validation = () => {
    const isPhoneNumberValid =
      validPhone.test(Inputs.phoneNumber) && Inputs.phoneNumber.length === 10;
    const isGst = validGst.test(Inputs.gstNumber);
    const isPostcode = Validpostcode.test(Inputs.postalCode);
    const ispan = validpan.test(Inputs.pan);
    if (!isPhoneNumberValid) {
      toast.error("Invalid phone number", { position: errorToastPosition });
    }

    if (!isGst) {
      toast.error("Invalid GST number", { position: errorToastPosition });
    }

    if (!isPostcode) {
      toast.error("Invalid postal code", { position: errorToastPosition });
    }

    if (!ispan) {
      toast.error("Invalid PAN", { position: errorToastPosition });
    }

    if (!isPhoneNumberValid || !isGst || !isPostcode || !ispan) {
    } else {
      handelSubmit();
    }

    setValid(() => ({
      phonevalid: !isPhoneNumberValid,
      gstvalid: !isGst,
      postCodevalid: !isPostcode,
      panvalid: !ispan,
    }));
  };

  const dispatch = useDispatch();

  var msg = useSelector((state) => state.CompanyReducer.resultcompany?.flag);

  const navigate = useNavigate();

  useEffect(() => {
    if (msg === true) {
      toast.success("Successfully", { position: successToastPosition });

      dispatch(companyAction.companyData());
    }
  }, [dispatch, msg]);
  const handelSubmit = async () => {
    if (
      !valid.gstvalid &&
      !valid.phonevalid &&
      !valid.postCodevalid &&
      !valid.panvalid
    ) {
      dispatch(company(Inputs));
      dispatch(companyAction.companyData());
      setInputs({
        companyName: "",
        gstNumber: "",
        email: "",
        phoneNumber: "",
        address: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        ownerName: "",
        pan: "",
        purchaseStock: "",
        ownerEmail: "",
        ownerPhoneNumber: "",
        businessType: "",
      });
    }
  };

  return (
    <div className=" flex-col min-h-screen justify-center flex items-center  bg-gray-100 ">
      <div className=" flex-col flex items-center py-4 bg-white shadow-md rounded   justify-center  ">
        <h2 className="col-span-full  justify-center text-center mb-4 text-primary text-2xl font-bold">
          Company Form
        </h2>
        <form className="grid grid-cols-1  gap-6 md:grid-cols-2 py-3 lg:grid-cols-3 xl:grid-cols-3 pt-6  mb-4 lg:w-3/4">
          <div className="mb-4">
            <label
              htmlFor="exampleInputEmail1"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Company Name
            </label>
            <input
              type="text"
              className="form-input border border-primary w-full rounded-xl"
              id="exampleInputCname"
              aria-describedby="emailHelp"
              onChange={handelchange}
              name="companyName"
              value={Inputs.companyName}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="exampleInputEmail1"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email address
            </label>
            <input
              type="email"
              className="form-input border border-primary w-full rounded-xl"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={handelchange}
              name="email"
              value={Inputs.email}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="exampleInputpstock"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              purchaseStock
            </label>
            <input
              type="text"
              className="form-input border border-primary w-full rounded-xl"
              id="exampleInputstock"
              onChange={handelchange}
              name="purchaseStock"
              value={Inputs.purchaseStock}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="exampleInputaddress"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Date
            </label>
            <DateRangePicker
              className=" border border-primary w-full rounded-xl"
              value={Inputs.date}
              onChange={handleDateChange}
              placeholder="date"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="exampleInputEmail1"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Pan
            </label>
            <input
              type="text"
              className={`form-input border border-primary w-full rounded-xl ${
                valid.panvalid ? "border-red-500" : ""
              }`}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={handelchange}
              name="pan"
              value={Inputs.pan}
            />
            <div>
              {valid.panvalid && (
                <p className="text-red-500">Invalid Pan Number</p>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Gst Number
            </label>
            <input
              type="text"
              className={`form-input border border-primary w-full rounded-xl ${
                valid.gstvalid ? "border-red-500" : ""
              }`}
              id="exampleInputGst"
              aria-describedby="emailHelp"
              onChange={handelchange}
              name="gstNumber"
              value={Inputs.gstNumber}
            />
            <div>
              {valid.gstvalid && (
                <p className="text-red-500">Invalid GST Number</p>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="exampleInputPhoneNo"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              phone Number
            </label>
            <div>
              <div className="flex ">
                <select className="form-input border border-primary w-20 rounded-l-xl">
                  <option>+91</option>

                  {countryList.map((Countycode, index) => {
                    return (
                      <option key={index} value={Countycode.dialCode}>
                        {Countycode.dialCode}
                      </option>
                    );
                  })}
                </select>

                <input
                  type="text"
                  className={`form-input border border-primary w-full rounded-r-xl ${
                    valid.phonevalid ? "border-red-500" : ""
                  }`}
                  id="exampleInputPhoneNo"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  onChange={handelchange}
                  onKeyPress={(e) => {
                    // Allow only numeric characters
                    const isValid = /^\d+$/.test(e.key);
                    if (!isValid) {
                      e.preventDefault();
                    }
                  }}
                  name="phoneNumber"
                  value={Inputs.phoneNumber}
                />
              </div>

              <div>
                {valid.phonevalid && (
                  <p className="text-red-500">Invalid Phone number</p>
                )}
              </div>
            </div>{" "}
          </div>

          <div className="mb-4">
            <label
              htmlFor="exampleInputaddress"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Adress
            </label>
            <input
              type="text"
              className="form-input border border-primary w-full rounded-xl"
              id="exampleInputaddress"
              onChange={handelchange}
              name="address"
              value={Inputs.address}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="exampleInputcity"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              {" "}
              {/* Fix 'for' to 'htmlFor' */}
              City
            </label>
            <input
              type="text"
              className="form-input border border-primary w-full rounded-xl"
              id="exampleInputcity"
              onChange={handelchange}
              name="city"
              value={Inputs.city}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="exampleInputstate"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              {" "}
              {/* Fix 'for' to 'htmlFor' */}
              State
            </label>
            <input
              type="text"
              className="form-input border border-primary w-full rounded-xl"
              id="exampleInputstate"
              onChange={handelchange}
              name="state"
              value={Inputs.state}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="exampleInputcountry"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Country
            </label>
            {/* <input
            type="text"
            className={`form-input border border-primary w-full rounded-xl ${
              valid.countryvalid ? "border-red-500" : ""
            }`}
            id="exampleInputcountry"
            onChange={handelchange}
            name="country"
            value={Inputs.country}
          /> */}

            <select
              className="block w-full p-2 border border-gray-300 rounded-md"
              onChange={handelchange}
              name="country"
              value={Inputs.country}
            >
              <option disabled>Select a country</option>
              {countryList.map((country) => (
                <option key={country.name} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            {selectedCountry && (
              <p className="mt-4 text-green-600">
                You selected: {selectedCountry}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="exampleInputcode"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Postal Code
            </label>
            <input
              type="text"
              className={`form-input border border-primary w-full rounded-xl ${
                valid.postCodevalid ? "border-red-500" : ""
              }`}
              id="exampleInputcode"
              onChange={handelchange}
              name="postalCode"
              value={Inputs.postalCode}
            />
            <div>
              {" "}
              {valid.postCodevalid && (
                <p className="text-red-500">Invalid PostCode</p>
              )}
            </div>
          </div>
        </form>
        <div className="flex items-center justify-between col-3">
          <button
            className="btn py-2.5 text-xl bg-purple border border-purple rounded-md text-white transition-all duration-300 hover:bg-purple/[0.85] hover:border-purple/[0.85]"
            onClick={validation}
            type="submit"
          >
            Submit
          </button>
        </div>
        <ToastContainer
          position={successToastPosition}
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        <ToastContainer />
        <ToastContainer
          position={errorToastPosition}
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
};

export default Company;
