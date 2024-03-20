import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { creatEIsuue } from "../reducer/Helpreducer";
import { ToastContainer, toast } from "react-toastify";

const Help = () => {
  const dispatch = useDispatch();
  const flag = useSelector((state) => state.Helpereducer?.result?.flag);
  const [moduleName, setModuleName] = useState({
    issueComponent: "",
    issueTopic: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModuleName((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (flag) {
      toast.success("Sucessfull", "sucess");

      setTimeout(() => {
        setModuleName({
          issueComponent: "",
          issueTopic: "",
        });
      }, 1000);
    }
  }, [flag]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Module Name:", moduleName);
    dispatch(creatEIsuue(moduleName));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Help Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="issueComponent"
            className="block text-sm font-semibold mb-2"
          >
            Issue Component:
          </label>
          <select
            id="issueComponent"
            name="issueComponent"
            value={moduleName.issueComponent}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select Issue Component</option>
            <option value="party">Party</option>
            <option value="item">Item</option>
            <option value="receipt">Receipt</option>{" "}
            {/* Corrected typo 'recipt' to 'receipt' */}
            <option value="payment">Payment</option>
            <option value="transaction" disabled>
              Transaction
            </option>
            <option value="purchaseBilling">Purchase Billing</option>
            <option value="salesBilling">Sales Billing</option>
            <option value="deliveryChallan">Delivery Challan</option>
            <option value="quotation">Quotation/Estimate</option>
            <option value="reports">Reports</option>
            <option value="purchase">Purchase</option>
            <option value="sales">Sales</option>
            <option value="gstr1">GSTR1</option>
            <option value="gstr2">GSTR2</option>
            <option value="balanceSheet">Balance Sheet</option>
            <option value="accountPayable">Account Payable</option>
            <option value="accountReceivable">Account Receivable</option>
            <option value="help">Help</option>
            <option value="dashboard">Dashboard</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="issueTopic"
            className="block text-sm font-semibold mb-2"
          >
            Issue Topic or Faces Problem:
          </label>
          <textarea
            id="issueTopic"
            name="issueTopic"
            value={moduleName.issueTopic}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      <ToastContainer
        position="top-center"
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
    </div>
  );
};

export default Help;
