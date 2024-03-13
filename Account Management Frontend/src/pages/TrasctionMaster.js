import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  traction_Action,
  transction_Update,
  transction_create,
  transction_get,
} from "../reducer/Trasction_reducer";

import { Link } from "react-router-dom";
import "react-notifications/lib/notifications.css";

import { ToastContainer, toast } from "react-toastify";
import { apipartyGet } from "../reducer/Party_reducer";
const TrasactionMaster = ({ data, mode, transectionType }) => {
  const [inputs, setInput] = useState({
    paymentNo: "",
    transectionType: transectionType,
    AccountFrom: "",
    AccountTo: "",
    chequeNo: "",
    amount: "",
    narration: "",

    invoiceNo: "",
  });

  useEffect(() => {
    setInput(data);
  }, [data]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(apipartyGet());
  }, []);

  const handelchange = (e) => {
    const { name, value } = e.target;
    setInput({ ...inputs, [name]: value, transectionType });
  };

  const party = useSelector((state) => state.PartyReducer.result?.data || []);
  const handelSubmit = (e) => {
    e.preventDefault();
    try {
      if (mode === "update") {
        dispatch(transction_Update(inputs));

      } else {
       
        dispatch(transction_create(inputs));
      }
      dispatch(transction_get());
      setInput({
        paymentNo: "",
        transectionType: transectionType,
        AccountFrom: "",
        AccountTo: "",
        chequeNo: "",
        amount: "",
        narration: "",

        invoiceNo: "",
      });
    } catch {}
  };

  return (
    <>
      <div className="flex items-center  justify-center mb-0">
        <form
          className=" bg-white rounded mb-4 w-full h-full"
          onSubmit={handelSubmit}
        >
          <div className="grid grid-cols-2 gap-6 px-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 ">
            
            <h2 className="col-span-full text-center mb-4 text-purple text-2xl font-bold">
              {transectionType == "credit" && "Recipt"}
              {transectionType == "debit" && "Payment"}
            </h2>
            

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                AccountTo
              </label>

              <select
                value={inputs.AccountTo}
                
                name="AccountTo"
                onChange={handelchange}
                className="form-input border  border-primary w-full h-10 rounded-md"
              >
                <option value="">Select </option>
                {party.map((items, index) => (
                  <option key={index} value={items.partyName}>
                    {items.partyName}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                AccountFrom
              </label>
              <select
                name="AccountFrom"
                value={inputs.AccountFrom}
                onChange={handelchange}
                className="form-input border border-primary w-full h-10 rounded-md"
              >
                <option value="">Select </option>
                {party.map((items, index) => (
                  <option key={index} value={items.partyName}>
                    {items.partyName}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                amount
              </label>
              <input
                type="number"
                name="amount"
                onChange={handelchange}
                value={inputs.amount}
                className="form-input border border-gray-400 w-full h-10 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                invoiceNo
              </label>
              <input
                type="text"
                name="invoiceNo"
                onChange={handelchange}
                value={inputs.invoiceNo}
                className="form-input border border-gray-400 w-full h-10 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                chequeNo
              </label>
              <input
                type="text"
                name="chequeNo"
                onChange={handelchange}
                value={inputs.chequeNo}
                className="form-input border border-gray-400 w-full h-10 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                narration
              </label>
              <input
                type="text"
                name="narration"
                onChange={handelchange}
                value={inputs.narration}
                className="form-input border border-gray-400 w-full h-10 rounded-md"
              />
            </div>
          </div>
          <div className="  text-center mb-4 text-primary text-2xl font-bold items-center justify-between mt-4">
            {mode === "add" && (
              <button
                className="btn py-2.5 text-xl bg-purple border border-purple rounded-md text-white transition-all duration-300 hover:bg-purple/[0.85] hover:border-purple/[0.85]"
                onClick={handelSubmit}
                type="submit"
              >
                Submit
              </button>
            )}
            {mode === "update" && (
              <button
                className="btn py-2.5 text-xl bg-purple border border-purple rounded-md text-white transition-all duration-300 hover:bg-purple/[0.85] hover:border-purple/[0.85]"
                onClick={handelSubmit}
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
export default TrasactionMaster;
