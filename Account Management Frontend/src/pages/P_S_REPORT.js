import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { fetchDetailsComapny } from "../reducer/Company_reducer";

const P_S_REPORT = () => {
  const dispatch = useDispatch();

  const id = localStorage.getItem("itemid");

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
    (acc, item) => acc + parseFloat(item.payAmount),
    0
  );
  const totalDueAmount = filteredData.reduce(
    (acc, item) => acc + parseFloat(item.dueAmount),
    0
  );
  const formattedTotalSaleAmount = totalGTotal.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });

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
      <section>
        <div class="container">
          <div class="grid grid-cols-2">
            <div>
              <h1 class="text-xl font-bold">
                {cmpData && cmpData.companyName}
              </h1>
              <p class="text-lg">
                Phone Number: {cmpData && cmpData.phoneNumber}
              </p>
              <p class="text-lg py-5">
                No. of entries: {filteredData && filteredData.length}
              </p>
            </div>
            <div class="text-end">
              <h1 class="text-xl font-bold">Sales Report</h1>
              <p class="text-lg">{filteredDate}</p>
              <p class="text-xl font-bold py-5">
                Total Sale Amount: {formattedTotalSaleAmount}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="my-6">
        <div class="container">
          <div class="border border-blue-700 rounded-xl px-3 py-5">
            <table class="w-full">
              <thead class="">
                <tr class="border-b-2 border-black ">
                  <th class="py-2">S.No</th>
                  <th class="py-2">Date</th>
                  <th class="py-2">Inv No.</th>
                  <th class="py-2">Name</th>
                  <th class="py-2">Txn Type</th>
                  <th class="py-2">Due Date</th>
                  <th class="py-2">Status</th>
                  <th class="py-2">total</th>
                  <th class="py-2">Received</th>
                  <th class="py-2">Bal</th>
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
                <tr class="text-center font-bold">
                  <td colspan="7"></td>
                  <td> {formattedTotalSaleAmount}</td>
                  <td> {formattedTotalPayAmount}</td>
                  <td> {formattedTotalDueAmount}</td>
                </tr>
              </tfoot>
              <thead>
                {/* <tr class="">
                  <th class="py-2 border border-black">#</th>
                  <th class="py-2 border border-black">Item Name</th>
                  <th class="py-2 border border-black">Quantity</th>
                  <th class="py-2 border border-black">Price/Unit</th>
                  <th class="py-2 border border-black">Discount</th>
                  <th class="py-2 border border-black">Tax</th>
                  <th class="py-2 border border-black">Amount</th>
                </tr> */}
              </thead>
              {/* <tbody>
                <tr class=" text-center">
                  <td class="py-2 border border-black">01</td>
                  <td class="py-2 border border-black">PC</td>
                  <td class="py-2 border border-black">1.0</td>
                  <td class="py-2 border border-black">₹500</td>
                  <td class="py-2 border border-black">₹0</td>
                  <td class="py-2 border border-black">₹14.56 </td>
                  <td class="py-2 bg-blue-50 border border-black">₹500</td>
                </tr>
                <tr class="text-center font-bold bg-blue-50">
                  <td class="border border-black"></td>
                  <td class="py-2 border border-black">Sub-total Amount</td>
                  <td class="py-2 border border-black">1</td>
                  <td class="border border-black"></td>
                  <td class="border border-black"></td>
                  <td class="py-2 border border-black">5000</td>
                  <td class="py-2 border border-black">375</td>
                </tr>
                <tr class="text-center font-bold">
                  <td>Total</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>₹2,50,500</td>
                  <td>₹50,500</td>
                  <td>₹2,00,000</td>
                </tr>
              </tbody> */}
            </table>
          </div>
        </div>
        {/* <!-- end container --> */}
      </section>
    </>
  );
};

export default P_S_REPORT;
