import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getbilldata } from "../reducer/billing_reducer";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const PurchaseReport = ({ mode }) => {
  const dispatch = useDispatch();
  const records = useSelector(
    (state) => state.BillingReducer.resultData?.data || []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (mode === "salse") {
      dispatch(getbilldata("SalesBook"));
    } else {
      dispatch(getbilldata("purchaseBook"));
    }
  }, [mode, dispatch]);

  // Filter records based on search term
  const filteredRecords = records.filter(
    (record) =>
      record.bPartyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter records based on selected month
  const filteredRecordsByMonth = selectedMonth
    ? filteredRecords.filter((record) => {
        const recordMonth = new Date(record.createDate).getMonth() + 1;
        return recordMonth === selectedMonth;
      })
    : filteredRecords;

  // Calculate the index of the last record to display on the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  // Calculate the index of the first record to display on the current page
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // Get the records to display on the current page
  const currentRecords = filteredRecordsByMonth.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  // Change the page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle the change in the number of records per page
  const handleRecordsPerPageChange = (event) => {
    setRecordsPerPage(parseInt(event.target.value));
    setCurrentPage(1); // Reset the current page to 1 when changing records per page
  };

  // Handle search input change
  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset the current page to 1 when changing search term
  };

  // Handle month dropdown change
  const handleMonthDropdownChange = (event) => {
    setSelectedMonth(parseInt(event.target.value) || null);
    setCurrentPage(1); // Reset the current page to 1 when changing selected month
  };

  // Handle start date change
  const handleStartDateChange = (date) => {
    setStartDate(date);
    setCurrentPage(1); // Reset the current page to 1 when changing start date
  };

  // Handle end date change
  const handleEndDateChange = (date) => {
    setEndDate(date);
    setCurrentPage(1); // Reset the current page to 1 when changing end date
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
                  <option value="10">10</option>
                  <option value="30">30</option>
                  <option value="50">50</option>
                </select>
                <p class="ml-2">entries</p>
              </div>
              <input
                type="text"
                onChange={handleSearchInputChange}
                class=" w-50 ml-4 rounded-md mb-3"
                placeholder="Search by name or invoice number"
              />
            </div>
            <div className="flex justify-between  text-center space-x-4 px-4 mt-3">
              <div className="flex items-center">
                <p className="mr-2">Filter by month:</p>
                <select
                  value={selectedMonth || ""}
                  onChange={handleMonthDropdownChange}
                  className="h-8 py-1 px-5 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                >
                  <option value="">All</option>
                  {[...Array(12).keys()].map((month) => (
                    <option key={month + 1} value={month + 1}>
                      {new Date(null, month).toLocaleDateString(undefined, {
                        month: "long",
                      })}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center">
                <p className="mr-2">Filter by date range:</p>
                <DatePicker
                  selected={startDate}
                  onChange={handleStartDateChange}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Start Date"
                  className="h-8 py-1 px-3 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
                <DatePicker
                  selected={endDate}
                  onChange={handleEndDateChange}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  placeholderText="End Date"
                  className="h-8 py-1 px-3 border rounded-md ml-2 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div className="overflow-auto">
              <table className="min-w-[640px] w-full  table-hover">
                <thead>
                  <tr className="border-separate">
                    <th class="w-24 text-center">Sr No.</th>
                    <th class="w-32">Invoice ID</th>
                    <th class="w-32">Party</th>
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
                      <td>{formatDate(record.createDate)}</td>
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
                  <li>
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Prev
                    </button>
                  </li>

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
