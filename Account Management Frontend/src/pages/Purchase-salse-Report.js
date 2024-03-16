import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getbilldata } from "../reducer/billing_reducer";

const PurchaseReport = ({ mode }) => {
  const dispatch = useDispatch();
  let records = useSelector(
    (state) => state.BillingReducer.resultData?.data || []
  );

  useEffect(() => {
    if (mode === "salse") {
      dispatch(getbilldata("SalesBook"));
    } else {
      dispatch(getbilldata("purchaseBook"));
    }
  }, [mode]);
  return (
    <>
      <div className="flex flex-col gap-4 min-h-[calc(100vh-212px)]">
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white border border-black/10 p-3 rounded dark:bg-darklight dark:border-darkborder">
            <div className="flex  justify-between  text-center space-x-4 px-4">
              <div class="flex justify-center items-center ">
                <p class="mr-2">Show</p>
                <select
                  name="noOfrecord"
                  class="h-8  py-1 px-5 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                </select>
                <p class="ml-2">entries</p>
              </div>
              <input
                type="text"
                // onChange={handleSearchInputChange}
                class=" w-50 ml-4 rounded-md mb-3"
                placeholder="search "
              />
            </div>

            <div className="overflow-auto">
              <table className="min-w-[640px] w-full  table-hover">
                <thead>
                  <tr className="border-separate">
                    <th class="w-24 text-center">Sr No.</th>
                    <th class="w-32">Invoice ID</th>
                    <th class="w-32">Party</th>
                    {/* <th class="w-32">AccountGroup</th> */}
                    <th class="w-32">Date</th>
                    <th class="w-32">Price</th>
                    <th class="w-32">Paid Amount</th>
                    <th class="w-32">Remain AMount</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record, index) => (
                    <tr key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td>{record.invoiceNo}</td>
                      <td>{record.bPartyName}</td>
                      {/* Render other columns as per your data structure */}
                      <td>{record.createDate}</td>
                      <td>{record.gtotalAmount}</td>
                      <td>{record.payAmount}</td>
                      <td>{record.dueAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchaseReport;
