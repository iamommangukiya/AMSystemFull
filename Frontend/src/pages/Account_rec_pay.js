import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { transction_Records } from "../reducer/Trasction_reducer";

import "sweetalert2/dist/sweetalert2.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveAs } from "file-saver";

import * as XLSX from "xlsx";
const Account_REC_PAY = ({ mode }) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    dispatch(transction_Records());
  }, [dispatch]);

  const result1 = useSelector(
    (state) => state.TransctionReducer.transectionReports?.data
  );

  let filteredResults = [];
  if (mode == "payable") {
    if (result1) {
      filteredResults = result1.filter(
        (item) => item.transectionType === "debit"
      );
    }
  } else {
    if (result1) {
      filteredResults = result1.filter(
        (item) => item.transectionType === "credit"
      );
    }
  }

  // Function to filter transaction records based on search query
  const filterRecords = () => {
    if (!filteredResults) {
      return [];
    } else {
      return filteredResults.filter((item) =>
        Object.values(item).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  };

  // Get current items based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterRecords().slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredResults);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transaction Records");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    saveAs(
      new Blob([excelBuffer], { type: "application/octet-stream" }),
      "transaction_report.xlsx"
    );
  };
  // Generate pagination links
  const totalPages = Math.ceil(filterRecords().length / itemsPerPage);
  const paginationLinks = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationLinks.push(
      <a
        key={i}
        href="#"
        onClick={() => paginate(i)}
        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
          i === currentPage ? "bg-indigo-600 text-white" : "text-gray-900"
        } ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
      >
        {i}
      </a>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4 min-h-[calc(100vh-212px)]">
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white border border-black/10 p-5 rounded dark:bg-darklight dark:border-darkborder">
            <div className="flex justify-end mt-4 space-x-2">
              <input
                type="text"
                placeholder="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 border rounded"
              />
              <button
                onClick={exportToExcel}
                className="bg-[#225777] text-white px-4 py-2 rounded-md mr-2"
              >
                Export to Excel
              </button>
            </div>

            <div className="overflow-auto">
              <table className="min-w-[640px] w-full mt-4 table-hover">
                <thead>
                  <tr className="border-separate">
                    <th className="w-32">Sr No</th>
                    {mode == "payable" && (
                      <>
                        <th className="w-32">Account from</th>
                        <th className="w-32">Party name</th>
                      </>
                    )}
                    {mode == "recive" && (
                      <>
                        <th className="w-32">party name</th>
                        <th className="w-32">Account to</th>
                      </>
                    )}

                    <th className="w-32">TransectionType</th>
                    <th className="w-24">Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((item, index) => (
                      <tr key={index}>
                        <td className="text-center">
                          {indexOfFirstItem + index + 1}
                        </td>
                        {/* partyName */}
                        {mode == "recive" && (
                          <>
                            <td className="text-center">{item.AccountFrom}</td>
                            <td className="text-center">{item.AccountTo}</td>
                          </>
                        )}
                        {mode == "payable" && (
                          <>
                            <td className="text-center">{item.AccountTo}</td>
                            <td className="text-center">{item.AccountFrom}</td>
                          </>
                        )}

                        <td className="text-center">{item.transectionType}</td>
                        <td className="text-center">{item.Amount}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {filterRecords().length > itemsPerPage && (
        <div className="flex justify-center mt-4">
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {/* Previous button */}
            <a
              href="#"
              onClick={() => paginate(currentPage - 1)}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${
                currentPage === 1 && "pointer-events-none opacity-50"
              } hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            {/* Pagination links */}
            {paginationLinks}
            {/* Next button */}
            <a
              href="#"
              onClick={() => paginate(currentPage + 1)}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${
                currentPage === totalPages && "pointer-events-none opacity-50"
              } hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </nav>
        </div>
      )}
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
    </>
  );
};

export default Account_REC_PAY;
