import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { fetchDetailsComapny } from "../reducer/Company_reducer";
import { usePDF, Margin } from "react-to-pdf";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const P_S_REPORT = () => {
  const dispatch = useDispatch();

  const id = localStorage.getItem("itemid");
  const { toPDF, targetRef } = usePDF({
    filename: "report.pdf",
    page: {
      size: "auto",
      margin: Margin.MEDIUM,
    },
  });

  useEffect(() => {
    dispatch(fetchDetailsComapny(id));
  }, [dispatch, id]);
  const cmpData = useSelector(
    (state) => state.CompanyReducer?.result?.data?.[0]
  );
  console.log(cmpData);
  const location = useLocation();
  const filteredData = location.state.filteredData;
  const filteredDate = location.state.filterInfo;
  console.log(filteredDate);
  const totalGTotal = filteredData.reduce(
    (acc, item) => acc + parseFloat(item.gtotalAmount),
    0
  );
  const totalPayAmount = filteredData.reduce(
    (acc, item) => acc + parseFloat(item.payAmount == "" ? 0 : item.payAmount),
    0
  );
  const totalDueAmount = filteredData.reduce(
    (acc, item) => acc + parseFloat(item.dueAmount == "" ? 0 : item.dueAmount),
    0
  );
  const formattedTotalSaleAmount = totalGTotal.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
  console.log(filteredData);

  const formattedTotalPayAmount = totalPayAmount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const formattedTotalDueAmount = totalDueAmount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const [data, setData] = useState([]);
  return (
    <>
      <section className="flex justify-end mb-4 mr-4">
        <button
          className="bg-black text-white rounded-lg py-2 px-5 border border-black "
          onClick={() => toPDF()}
        >
          GET PDF
        </button>
      </section>
      <section ref={targetRef} className="bg-white p-5 rounded-lg">
        <section>
          <div className="container">
            <div className="grid grid-cols-2">
              <div>
                <h1 className="text-xl font-bold">
                  {cmpData && cmpData.companyName}
                </h1>
                <p className="text-lg">
                  Phone Number: {cmpData && cmpData.phoneNumber}
                </p>
                <p className="text-lg py-5">
                  No. of entries: {filteredData && filteredData.length}
                </p>
              </div>
              <div className="text-end">
                <h1 className="text-xl font-bold">Sales Report</h1>
                <p className="text-lg">{filteredDate}</p>
                <p className="text-xl font-bold py-5">
                  Total Sale Amount: {formattedTotalSaleAmount}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="my-6">
          <div className="container">
            <div className="border border-blue-700 rounded-xl px-3 py-5">
              <table className="w-full">
                <thead className="">
                  <tr className="border-b-2 border-black ">
                    <th className="py-2">S.No</th>
                    <th className="py-2">Date</th>
                    <th className="py-2">Inv No.</th>
                    <th className="py-2">Name</th>
                    <th className="py-2">Txn Type</th>
                    <th className="py-2">Due Date</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">total</th>
                    <th className="py-2">Received</th>
                    <th className="py-2">Due Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData &&
                    filteredData.map((item, index) => (
                      <tr key={index} className="text-center">
                        <td className="py-2">{index + 1}</td>
                        <td className="py-2">{item.invoiceDate}</td>
                        <td className="py-2">{item.invoiceNo}</td>
                        <td className="py-2">{item.bPartyName}</td>
                        <td className="py-2">{item.transactionType}</td>
                        <td className="py-2">{item.dueDate}</td>
                        <td className="py-2">{item.transactionType}</td>
                        <td className="py-2">₹ {item.gtotalAmount}</td>
                        <td className="py-2">₹ {item.payAmount}</td>
                        <td className="py-2">₹ {item.dueAmount}</td>
                      </tr>
                    ))}
                </tbody>
                <tfoot>
                  <tr className="text-center font-bold">
                    <td colspan="7"></td>
                    <td> {formattedTotalSaleAmount}</td>
                    <td> {formattedTotalPayAmount}</td>
                    <td> {formattedTotalDueAmount}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default P_S_REPORT;
