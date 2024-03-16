import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getbilldata } from "../reducer/billing_reducer";

const PurchaseReport = ({ mode }) => {
  const dispatch = useDispatch();
  const records = useSelector(
    (state) => state.BillingReducer.resultData?.data || []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);

  useEffect(() => {
    if (mode === "salse") {
      dispatch(getbilldata("SalesBook"));
    } else {
      dispatch(getbilldata("purchaseBook"));
    }
  }, [mode, dispatch]);

  // Calculate the index of the last record to display on the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  // Calculate the index of the first record to display on the current page
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // Get the records to display on the current page
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  // Change the page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle the change in the number of records per page
  const handleRecordsPerPageChange = (event) => {
    setRecordsPerPage(parseInt(event.target.value));
    setCurrentPage(1); // Reset the current page to 1 when changing records per page
  };

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
                  value={recordsPerPage}
                  onChange={handleRecordsPerPageChange}
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
                    <th class="w-32">Total Amount</th>
                    <th class="w-32">Paid Amount</th>
                    <th class="w-32">Remain AMount</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.map((record, index) => (
                    <tr key={index}>
                      <td className="text-center">
                        {indexOfFirstRecord + index + 1}
                      </td>
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
            <div className="flex justify-end mr-4 mt-4">
              <nav aria-label="Pagination">
                <ul className="flex list-style-none space-x-2">
                  {/* Render previous page button */}
                  <li>
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Prev
                    </button>
                  </li>

                  {/* Render page numbers */}
                  {Array.from(
                    { length: Math.ceil(records.length / recordsPerPage) },
                    (_, index) => index + 1
                  ).map((pageNumber) => (
                    <li key={pageNumber}>
                      <button
                        onClick={() => paginate(pageNumber)}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === pageNumber
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    </li>
                  ))}

                  {/* Render next page button */}
                  <li>
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={
                        currentPage ===
                        Math.ceil(records.length / recordsPerPage)
                      }
                      className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchaseReport;
