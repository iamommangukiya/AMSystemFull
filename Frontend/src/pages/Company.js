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
  const [step, setStep] = useState(1);

  const handlePrevious = () => {
    setStep(step - 1);
  };

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

  const validation = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const isPhoneNumberValid =
      validPhone.test(Inputs.phoneNumber) && Inputs.phoneNumber.length === 10;
    const isGst = validGst.test(Inputs.gstNumber);
    const isPostcode = Validpostcode.test(Inputs.postalCode);
    const ispan = validpan.test(Inputs.pan);
    // if (!isPhoneNumberValid) {
    //   toast.error("Invalid phone number", { position: errorToastPosition });
    // }

    // if (!isGst) {
    //   toast.error("Invalid GST number", { position: errorToastPosition });
    // }

    // if (!isPostcode) {
    //   toast.error("Invalid postal code", { position: errorToastPosition });
    // }

    // if (!ispan) {
    //   toast.error("Invalid PAN", { position: errorToastPosition });
    // }

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
  const [organizationType, setOrganizationType] = useState(""); // State for managing selected organiz

  const dispatch = useDispatch();
  var msg = useSelector((state) => state.CompanyReducer.resultcompany?.flag);

  const navigate = useNavigate();

  useEffect(() => {
    if (msg === true) {
      toast.success("Successfully", { position: successToastPosition });

      dispatch(companyAction.companyData());
      setTimeout(() => {
        navigate("/fetchcompany");
      }, 100);
    }
  }, [dispatch, msg]);
  const handelSubmit = async () => {
    if (
      !valid.gstvalid &&
      !valid.phonevalid &&
      !valid.postCodevalid &&
      !valid.panvalid &&
      organizationType !== ""
    ) {
      dispatch(company({ ...Inputs, businessType: organizationType }));
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
      setOrganizationType(""); // Reset organization type after submission
    }
  };

  const nextStep = () => {
    if (step == 1) {
      setStep(step + 1);
    }
    if (step == 2) {
      const ispan = validpan.test(Inputs.pan);
      const isGst = validGst.test(Inputs.gstNumber);
      setValid(() => ({
        gstvalid: !isGst,

        panvalid: !ispan,
      }));
      if (ispan && isGst) {
        setStep((prevStep) => prevStep + 1);
      }
    }
    if (step == 3) {
      const isPhoneNumberValid =
        validPhone.test(Inputs.phoneNumber) && Inputs.phoneNumber.length === 10;
      setValid(() => ({
        postCodevalid: !isPhoneNumberValid,
      }));
      if (isPhoneNumberValid) {
        setStep((prevStep) => prevStep + 1);
      }
    }
    if (step == 4) {
      const isPhoneNumberValid = Validpostcode.test(Inputs.postalCode);
      setValid(() => ({
        phonevalid: !isPhoneNumberValid,
      }));
      if (isPhoneNumberValid) {
        setStep((prevStep) => prevStep + 1);
      }
    }
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleOrganizationTypeChange = (e) => {
    setOrganizationType(e.target.value);
  };
  return (
    <div className=" flex-col min-h-screen justify-center flex items-center   ">
      {/* <!-- Start Background Images --> */}
      <div className="bg-white dark:bg-purple h-full bg-bottom bg-cover w-full -z-10 absolute"></div>
      {/* <!-- End Background Images --> */}
      <div className=" flex-col flex items-center py-4  rounded-xl   justify-center backdrop-blur-xl border backdrop-brightness-110 border-gray-300 shadow-2xl ">
        <h2 className="col-span-full text-[#225777]  justify-center text-center mb-4 text-primary text-4xl font-bold">
          Company Registration
        </h2>
        <form className="grid grid-cols-1 gap-5  md:grid-cols-2 py-3 lg:grid-cols-3 xl:grid-cols-3 pt-6  mb-4 lg:w-3/4">
          {step == 1 && (
            <div className="mb-4">
              <label className="block text-black mb-2">
                🡢 Organization Type
              </label>
              <div>
                <label className="inline-flex items-center ps-4">
                  <input
                    type="radio"
                    value="Retailer"
                    checked={organizationType === "Retailer"}
                    onChange={handleOrganizationTypeChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Retailer</span>
                </label>
                <label className="inline-flex items-center ps-4">
                  <input
                    type="radio"
                    value="Wholesaler"
                    checked={organizationType === "Wholesaler"}
                    onChange={handleOrganizationTypeChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Wholesaler</span>
                </label>
              </div>
            </div>
          )}
          {step == 2 && (
            <>
              {" "}
              <div className="mb-4">
                <label
                  htmlFor="exampleInputEmail1"
                  className="block text-black text-sm mb-2"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  className="form-input bg-transparent backdrop-blur-3xl backdrop-brightness-200  border border-light rounded-md placeholder:text-white focus:border-0 shadow-md"
                  id="exampleInputCname"
                  aria-describedby="emailHelp"
                  required
                  onChange={handelchange}
                  name="companyName"
                  value={Inputs.companyName}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="exampleInputEmail1"
                  className="block text-black text-sm mb-2"
                >
                  Pan
                </label>
                <input
                  type="text"
                  className={`form-input bg-transparent backdrop-blur-3xl backdrop-brightness-200  border rounded-md border-light  placeholder:text-white focus:border-0 shadow-md
              ${valid.panvalid ? "border-red-500" : ""}`}
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
                <label className="block text-black text-sm mb-2">
                  Gst Number
                </label>
                <input
                  type="text"
                  className={`form-input bg-transparent backdrop-blur-3xl backdrop-brightness-200  border border-light rounded-md placeholder:text-white focus:border-0 shadow-md ${
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
                  htmlFor="exampleInputaddress"
                  className="block text-black text-sm mb-2"
                >
                  End Of Month Date
                </label>
                <input
                  className="form-input bg-transparent backdrop-blur-3xl backdrop-brightness-200  border border-light rounded-md placeholder:text-white focus:border-0 shadow-md"
                  value={Inputs.date}
                  type="date"
                  onChange={handleDateChange}
                  placeholder="date"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="exampleInputpstock"
                  className="block text-black text-sm mb-2"
                >
                  purchaseStock
                </label>
                <input
                  type="text"
                  className="form-input bg-transparent backdrop-blur-3xl backdrop-brightness-200  border border-light rounded-md placeholder:text-white focus:border-0 shadow-md"
                  id="exampleInputstock"
                  onChange={handelchange}
                  name="purchaseStock"
                  value={Inputs.purchaseStock}
                />
              </div>
            </>
          )}

          {/* //email */}
          {step == 3 && (
            <>
              {" "}
              <div className="mb-4">
                <label
                  htmlFor="exampleInputEmail1"
                  className="block text-black text-sm mb-2"
                >
                  Email address
                </label>
                <input
                  type="email"
                  className="form-input bg-transparent backdrop-blur-3xl backdrop-brightness-200  border border-light rounded-md placeholder:text-white focus:border-0 shadow-md"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={handelchange}
                  name="email"
                  value={Inputs.email}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="exampleInputPhoneNo"
                  className="block text-black text-sm mb-2"
                >
                  phone Number
                </label>
                <div>
                  <div className="flex ">
                    <input
                      type="text"
                      value={+91}
                      className="form-input bg-transparent backdrop-blur-3xl backdrop-brightness-200  border border-light rounded-md placeholder:text-white focus:border-0 shadow-md w-12"
                      readOnly
                      disabled
                    />
                    <input
                      type="text"
                      className={`form-input bg-transparent backdrop-blur-3xl backdrop-brightness-200  border border-light rounded-md placeholder:text-white focus:border-0 shadow-md ${
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
            </>
          )}
          {step == 4 && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="exampleInputaddress"
                  className="block text-black text-sm mb-2"
                >
                  Adress
                </label>
                <input
                  type="text"
                  className="form-input bg-transparent backdrop-blur-3xl backdrop-brightness-200  border border-light rounded-md placeholder:text-white focus:border-0 shadow-md"
                  id="exampleInputaddress"
                  onChange={handelchange}
                  name="address"
                  value={Inputs.address}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="exampleInputcity"
                  className="block text-black text-sm mb-2"
                >
                  {" "}
                  {/* Fix 'for' to 'htmlFor' */}
                  City
                </label>
                <input
                  type="text"
                  className="form-input bg-transparent backdrop-blur-3xl backdrop-brightness-200  border border-light rounded-md placeholder:text-white focus:border-0 shadow-md"
                  id="exampleInputcity"
                  onChange={handelchange}
                  name="city"
                  value={Inputs.city}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="exampleInputstate"
                  className="block text-black text-sm mb-2"
                >
                  {" "}
                  {/* Fix 'for' to 'htmlFor' */}
                  State
                </label>
                <input
                  type="text"
                  className="form-input bg-transparent backdrop-blur-3xl backdrop-brightness-200  border border-light rounded-md placeholder:text-white focus:border-0 shadow-md"
                  id="exampleInputstate"
                  onChange={handelchange}
                  name="state"
                  value={Inputs.state}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="exampleInputcountry"
                  className="block text-black text-sm mb-2"
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
                  className="form-input bg-transparent backdrop-blur-3xl backdrop-brightness-200  border border-light rounded-md placeholder:text-white focus:border-0 shadow-md"
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
                  className="block text-black text-sm mb-2"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  className={`form-input bg-transparent backdrop-blur-3xl backdrop-brightness-200  border border-light rounded-md placeholder:text-white focus:border-0 shadow-md ${
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
            </>
          )}
        </form>
        <div className="flex">
          <div>
            <div className="d-flex flex justify-content-between">
              {step > 1 && (
                <button
                  className=" variant btn me-5 w-40 text-lg bg-[#225777] border-0  rounded-md text-white transition-all duration-300 hover:bg-[#173054] hover:border-[#173054]secondary"
                  onClick={handlePrevious}
                >
                  Previous
                </button>
              )}
              {step < 4 && (
                <button
                  className="btn w-40 text-lg bg-[#225777] border-0  rounded-md text-white transition-all duration-300 hover:bg-[#173054] hover:border-[#173054]"
                  variant="primary"
                  onClick={nextStep}
                >
                  Next
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between col-3">
            {step == 4 && (
              <button
                className="btn w-40 text-lg bg-[#225777] border-0  rounded-md text-white transition-all duration-300 hover:bg-[#173054] hover:border-[#173054]"
                onClick={validation}
                type="submit"
              >
                Submit
              </button>
            )}
          </div>
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
