import React, { useEffect, useState } from "react";
import { validGst, validPhone, Validpostcode, validpan } from "./Regex";
import { useDispatch, useSelector } from "react-redux";
import coutry from "./country";

import {
  AccountGrop,
  apiparty,
  apipartyGet,
  partyAction,
  updateparty,
} from "../reducer/Party_reducer";
import "react-notifications/lib/notifications.css";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Party = ({ data, mode }) => {
  const [Inputs, setInputs] = useState({
    partyName: "",
    gstNumber: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    paymentTerms: "",
    accountGroup: "",
    statecode: "",
    pan: "",
    remarks: "",
    openingBalance: "",
    deliveryAddress: "",
    tds: "",
    creditLimit: "",
    distance: "",
    transporterName: "",

    natureOfOrg: "",
    partyGroup: "",
    discount: "",
    brokerage: "",
    rf: "",
    TCSRate: "",
  });

  useEffect(() => {
    setInputs(data);
  }, [data]);

  const errorToastPosition = "top-right";
  const countryList = Object.values(coutry);

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

  const partyName = useSelector(
    (state) => state.PartyReducer.resultparty?.flag
  );

  useEffect(() => {
    if (partyName === "false") {
      toast.error("Party Alredy exist", { position: errorToastPosition });
      dispatch(partyAction.addpartyEmpty());
    }
  }, [partyName]);

  const validation = () => {
    const isPhoneNumberValid =
      !Inputs.phoneNumber ||
      (validPhone.test(Inputs.phoneNumber) && Inputs.phoneNumber.length === 10);
    const isGst = !Inputs.gstNumber || validGst.test(Inputs.gstNumber);
    const isPostcode =
      !Inputs.postalCode || Validpostcode.test(Inputs.postalCode);
    const ispan = !Inputs.pan || validpan.test(Inputs.pan);
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
      toast.error(
        "Invalid input. Please check GST, PAN, phone number, and postal code.",
        {
          position: errorToastPosition,
        }
      );
    }
    setValid(() => ({
      phonevalid: !isPhoneNumberValid,
      gstvalid: !isGst,
      postCodevalid: !isPostcode,
      panvalid: !ispan,
    }));
  };

  const dispatch = useDispatch();

 

  const handelSubmit = (e) => {
    e.preventDefault();

    if (!valid.gstvalid && !valid.phonevalid && !valid.postCodevalid) {
      try {
        if (mode === "update") {
          dispatch(updateparty(Inputs));
          dispatch(partyAction.updatepartyEmpty());
        } else {
          dispatch(apiparty(Inputs));
          dispatch(partyAction.addpartyEmpty());
          setInputs({
            partyName: "",
            gstNumber: "",
            email: "",
            phoneNumber: "",
            address: "",
            city: "",
            state: "",
            country: "",
            postalCode: "",
            paymentTerms: "",
            accountGroup: "",
            statecode: "",
            pan: "",
            remarks: "",
            openingBalance: "",
            deliveryAddress: "",
            tds: "",
            creditLimit: "",
            distance: "",
            transporterName: "",

            natureOfOrg: "",
            partyGroup: "",
            discount: "",
            brokerage: "",
            rf: "",
            TCSRate: "",
          });
        }
        dispatch(apipartyGet());
      } catch {}
    }
  };

  return (
    <>
      <div className="  overflow-scroll flex items-center justify-center mt-0">
        <form
          className="bg-white shadow-md rounded px-2 "
          onSubmit={handelSubmit}
        >
          <h2 className="col-span-full text-[#225777]   text-center mb-10 text-primary text-2xl font-bold">
            PartyMaster
          </h2>
          <div className="grid grid-cols-4 gap-3  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-1">
            {/* <button className="rounded-full h-10 w-10 bg-black text-white">
          <Link to="/fetchcompany">go</Link>
        </button> */}
            <div className="mb-4">
              <label className="block text-black text-sm mb-2">PartyName</label>
              <input
                type="text"
                className="form-input border border-gray-400 w-full h-10 rounded-md"
                aria-describedby="emailHelp"
                onChange={handelchange}
                name="partyName"
                value={Inputs.partyName}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="exampleInputPhoneNo"
                className="block text-black text-sm mb-2"
              >
                phone Number
              </label>
              <div className="flex ">
                <select className="form-input border border-gray-400 w-20 h-10 rounded-l-md">
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
                  className={`form-input border border-gray-400 w-full h-10 rounded-r-md ${
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
              </div>{" "}
            </div>
            <div className="mb-4">
              <label
                htmlFor="exampleInputEmail1"
                className="block text-black text-sm mb-2"
              >
                Email address
              </label>
              <input
                type="email"
                className="form-input border border-gray-400 w-full h-10 rounded-md"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={handelchange}
                name="email"
                value={Inputs.email}
              />
            </div>
            <div className="mb-4">
              <label className="block text-black text-sm mb-2">Adress</label>
              <input
                type="text"
                className="form-input border border-gray-400 w-full h-10 rounded-md"
                id="exampleInputCname"
                aria-describedby="emailHelp"
                onChange={handelchange}
                name="address"
                value={Inputs.address}
              />
            </div>
            {/* <div className="mb-4">
              <label
                htmlFor="exampleInputcountry"
                className="block text-black text-sm mb-2"
              >
                Country
              </label>

              <select
                className="block w-full h-10 p-2 form-input rounded-l-md border border-gray-400 rounded-md"
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
              
            </div> */}
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
                className="form-input border border-gray-400 w-full h-10 rounded-md"
                id="exampleInputcity"
                onChange={handelchange}
                name="city"
                value={Inputs.city}
              />
            </div>
            {/* <div className="mb-4">
              <label
                htmlFor="exampleInputstatecode"
                className="block text-black text-sm mb-2"
              >
                State Code
              </label>
              <input
                type="number"
                className="form-input border border-gray-400 w-full h-10 rounded-md"
                id="exampleInputstatecode"
                onChange={handelchange}
                name="statecode"
                value={Inputs.statecode}
              />
            </div> */}
            {mode === "add" && (
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
                  className="form-input border border-gray-400 w-full h-10 rounded-md"
                  id="exampleInputstate"
                  onChange={handelchange}
                  name="state"
                  value={Inputs.state}
                />
              </div>
            )}
            <div className="mb-4">
              <label
                htmlFor="exampleInputcode"
                className="block text-black text-sm mb-2"
              >
                Postal Code
              </label>
              <input
                type="text"
                className={`form-input border border-gray-400 w-full h-10 rounded-md ${
                  valid.postCodevalid ? "border-red-500" : ""
                }`}
                id="exampleInputcode"
                onChange={handelchange}
                name="postalCode"
                value={Inputs.postalCode}
              />
            </div>
            {/* <div className="mb-4">
              <label className="block text-black text-sm mb-2">
                Account Group
              </label>

              <select
                className="  form-input border border-gray-400 w-full h-10 rounded-md"
                onChange={handelchange}
                re
                name="accountGroup"
                value={Inputs.accountGroup}
              >
                <option disabled>Select account group </option>
                {result &&
                  result.map((items, index) => {
                    return (
                      <option key={index} value={items.GroupName}>
                        {items.GroupName}{" "}
                      </option>
                    );
                  })}
              </select>
            </div> */}
            <div className="mb-4">
              <label
                htmlFor="exampleInputEmail1"
                className="block text-black text-sm mb-2"
              >
                Pan
              </label>
              <input
                type="text"
                className={`form-input border border-gray-400 w-full h-10 rounded-md ${
                  valid.panvalid ? "border-red-500" : ""
                }`}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={handelchange}
                name="pan"
                value={Inputs.pan}
              />
              {valid.panvalid && (
                <p className="text-red-500">Invalid pan number</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-black text-sm mb-2">
                Gst Number
              </label>
              <input
                type="text"
                className={`form-input border border-gray-400 w-full h-10 rounded-md ${
                  valid.gstvalid ? "border-red-500" : ""
                }`}
                id="exampleInputGst"
                onChange={handelchange}
                name="gstNumber"
                value={Inputs.gstNumber}
              />
            </div>
            {/* <div className="mb-4">
              <label className="block text-black text-sm mb-2">
                NatureOfOrg
              </label>
              <input
                type="text"
                className="form-input border border-gray-400 w-full h-10 rounded-md"
                onChange={handelchange}
                name="natureOfOrg"
                value={Inputs.natureOfOrg}
              />
            </div> */}
            <div className="mb-4">
              <label className="block text-black text-sm mb-2">
                DeliveryAddress
              </label>
              <input
                type="text"
                className="form-input border border-gray-400 w-full h-10 rounded-md"
                onChange={handelchange}
                name="deliveryAddress"
                value={Inputs.deliveryAddress}
              />
            </div>
            {/* <div className="mb-4">
              <label className="block text-black text-sm mb-2">
                Distance
              </label>
              <input
                type="text"
                className="form-input border border-gray-400 w-full h-10 rounded-md"
                onChange={handelchange}
                name="distance"
                value={Inputs.distance}
              />
            </div> */}
            {/* <div className="mb-4">
              <label className="block text-black text-sm mb-2">
                CreditLimit
              </label>
              <input
                type="number"
                className="form-input border border-gray-400 w-full h-10 rounded-md"
                id="exampleInputaddress"
                onChange={handelchange}
                name="creditLimit"
                value={Inputs.creditLimit}
              />
            </div> */}
            <div className="mb-4">
              <label className="block text-black text-sm mb-2">Remark</label>
              <input
                type="text"
                className="form-input border border-gray-400 w-full h-10 rounded-md"
                id="exampleInputCname"
                aria-describedby="emailHelp"
                onChange={handelchange}
                name="remarks"
                value={Inputs.remarks}
              />
            </div>

            {/* <div className="mb-4 relative">
              <label
                htmlFor="exampleInputstate"
                className="block text-black text-sm mb-2"
              >
                TDS
              </label>
              <div className="relative">
                <input
                  type="number"
                  className="form-input border border-gray-400 w-full h-10 rounded-md pr-10"
                  inputMode="decimal"
                  onChange={handelchange}
                  name="tds"
                  value={Inputs.tds}
                />
                <span className="absolute inset-y-0 right-2 flex items-center pr-6 text-gray-400 disabled:">
                  %
                </span>
              </div>
            </div> */}
            <div className="mb-4">
              <label
                htmlFor="exampleInputstate"
                className="block text-black text-sm mb-2"
              >
                Discount
              </label>
              <input
                type="number"
                className="form-input border border-gray-400 w-full h-10 rounded-md"
                inputmode="decimal"
                onChange={handelchange}
                name="discount"
                value={Inputs.discount}
              />
            </div>
            <div className="mb-4">
              <label className="block text-black text-sm  mb-2">
                TransporterName
              </label>
              <input
                type="text"
                className="form-input border border-gray-400 w-full h-10 rounded-md"
                onChange={handelchange}
                name="transporterName"
                value={Inputs.transporterName}
              />
            </div>
            <div className="mb-4">
              <label className="block text-black text-sm mb-2">Brokerage</label>
              <input
                type="number"
                className="form-input border border-gray-400 w-full h-10 rounded-md"
                onChange={handelchange}
                name="brokerage"
                value={Inputs.brokerage}
              />
            </div>
            {/* <div className="mb-4">
              <label
                htmlFor="exampleInputstate"
                className="block text-black text-sm mb-2"
              >
                RF
              </label>
              <input
                type="number"
                className="form-input border border-gray-400 w-full h-10 rounded-md"
                inputmode="decimal"
                onChange={handelchange}
                name="rf"
                value={Inputs.rf}
              />
            </div> */}
            <div className="mb-4">
              <label
                htmlFor="exampleInputstate"
                className="block text-black text-sm mb-2"
              >
                TCSRate
              </label>
              <input
                type="number"
                className="form-input border border-gray-400 w-full h-10 rounded-md"
                inputmode="decimal"
                onChange={handelchange}
                name="TCSRate"
                value={Inputs.TCSRate}
              />
            </div>
            {/* <div className="mb-4">
              <label className="block text-black text-sm mb-2">
                OpeningBalance
              </label>
              <input
                type="number"
                className="form-input border border-gray-400 w-full h-10 rounded-md"
                inputmode="decimal"
                onChange={handelchange}
                name="openingBalance"
                value={Inputs.openingBalance}
              />
            </div> */}
            <div className="mb-4">
              <label
                htmlFor="exampleInput"
                className="block text-black text-sm mb-2"
              >
                PaymentTerms
              </label>
              <input
                type="text"
                className="form-input border border-gray-400 w-full h-10 rounded-md"
                id="exampleInput"
                onChange={handelchange}
                name="paymentTerms"
                value={Inputs.paymentTerms}
              />
            </div>
          </div>
          <div className=" text-center mb-3 text-primary text-2xl items-center justify-between ">
            {/* <button
              className="btn py-2.5 text-xl bg-purple border border-purple rounded-md text-white transition-all duration-300 hover:bg-purple/[0.85] hover:border-purple/[0.85]"
              onClick={validation}
              type="submit"
            >
              Submit
            </button> */}
            {mode === "add" && (
              <button
                className="btn  text-xl bg-[#225777] border border-purple rounded-md text-white transition-all duration-300 hover:bg-[#173054] hover:border-[#173054]"
                onClick={validation}
                type="submit"
              >
                Submit
              </button>
            )}
            {mode === "update" && (
              <button
                className="btn text-xl bg-[#225777] border border-purple rounded-md text-white transition-all duration-300 hover:bg-[#173054] hover:border-[#173054]"
                onClick={validation}
                type="submit"
              >
                Update
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Party;
