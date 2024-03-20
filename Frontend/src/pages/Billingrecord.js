import React, { useEffect, useState } from "react";
import React_Modal from "../component/ReactModal";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";
import { deletebill, getbilldata } from "../reducer/billing_reducer";
import Biling from "./Biling";

const Billingrecord = ({ mode }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (mode === "purchase") {
      // Use === for comparison instead of =
      dispatch(getbilldata("PurchaseBook"));
    } else if (mode === "salse") {
      dispatch(getbilldata("salesBook")); // Removed redundant dispatch
    } else if (mode === "deliveryChallan") {
      dispatch(getbilldata("deliveryChallan"));
    } else if (mode === "quotation") {
      dispatch(getbilldata("quotation"));
    }
  }, [mode]); //

  let records = useSelector(
    (state) => state.BillingReducer.resultData?.data || []
  );

  const [filterName, setFilterName] = useState("");
  const navigate = useNavigate();
  const [filterDate, setFilterDate] = useState("latest");

  const [filteredData, setFilteredData] = useState(records || []);
  const handleCreateBill = () => {
    navigate("/dashboard/createBill", { state: { mode: mode } });
  };
  const handleSearchInputChange = (e) => {
    setFilterName(e.target.value);
  };
  const handleButtonClick = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        // console.log("index");
        // console.log(index);
        dispatch(deletebill(index));
        dispatch(getbilldata());
      }
    });
  };

  const handleDateFilterChange = (e) => {
    setFilterDate(e.target.value);
  };

  const applyFilters = (record) => {
    if (
      filterName &&
      !record.bPartyName.toLowerCase().includes(filterName.toLowerCase())
    ) {
      return false;
    }
    return true;
  };
  useEffect(() => {
    if (records) {
      setFilteredData(records);
    }
  }, [records]);

  const sortRecords = (a, b) => {
    if (filterDate === "latest") {
      return new Date(b.invoiceDate) - new Date(a.invoiceDate);
    } else if (filterDate === "oldest") {
      return new Date(a.invoiceDate) - new Date(b.invoiceDate);
    }
  };
  const handlePaymentStatus = (status) => {
    if (status === "All") {
      setFilteredData(records);
    } else if (records) {
      const data = records.filter((data) => {
        return (
          (status === "paid" && parseFloat(data.dueAmount) === 0) ||
          (status === "unpaid" && parseFloat(data.dueAmount) !== 0)
        );
      });
      setFilteredData(data);
    }
  };

  const handleUpdateClick = (index) => {
    navigate("/dashboard/createBill", {
      state: { data: filteredData[index], mode: mode },
    });
  };
  const handlePrintClick = (index) => {
    navigate("/dashboard/bill", {
      state: index,
    });
  };
  // console.log(filteredData);
  const displayFields = [
    "invoiceNo",
    "bPartyName",
    "payAmount",
    "dueAmount",
    "invoiceDate",
  ];
  return (
    <>
      {/* <React_Modal isOpen={Modal} closeModal={closeModal}></React_Modal> */}
      <div className="flex flex-col gap-4 min-h-[calc(100vh-212px)]">
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white border border-black/10 p-3 rounded dark:bg-darklight dark:border-darkborder">
            <div className="flex  justify-between  text-center">
              <div className="space-x-3">
                <input
                  type="text"
                  onChange={handleSearchInputChange}
                  className=" w-50 ml-4 rounded-md mb-3  dark:bg-darklight dark:text-white dark:border-darkborder border-[#225777] placeholder:text-[#225777] focus:border-[#225777]"
                  placeholder="search "
                />
                <select
                  onChange={handleDateFilterChange}
                  className=" w-50 ml-4 rounded-md mb-3  dark:bg-darklight dark:text-white dark:border-darkborder border-[#225777] placeholder:text-[#225777] focus:border-[#225777]"
                >
                  <option value="latest">Latest</option>
                  <option value="oldest">Oldest</option>
                </select>
                <button
                  className=" btn w-20 py-2 px-3 bg-[#225777] border border-[#225777] rounded-md text-white transition-all duration-300 hover:bg-[#173054] hover:border-[#173054]"
                  onClick={() => {
                    handlePaymentStatus("All");
                  }}
                >
                  all
                </button>
                <button
                  className=" btn w-20 py-2 px-3 bg-[#225777] border border-[#225777] rounded-md text-white transition-all duration-300 hover:bg-[#173054] hover:border-[#173054]"
                  onClick={() => {
                    handlePaymentStatus("paid");
                  }}
                >
                  paid
                </button>
                <button
                  className=" btn w-20 py-2 px-3 bg-[#225777] border border-[#225777] rounded-md text-white transition-all duration-300 hover:bg-[#173054] hover:border-[#173054]"
                  onClick={() => {
                    handlePaymentStatus("unpaid");
                  }}
                >
                  unpaid
                </button>
              </div>

              <button
                className="btn  py-2 mb-4 px-3 text-sm bg-[#225777] border border-[#225777] rounded-md text-white transition-all duration-300 hover:bg-[#173054] hover:border-[#173054]"
                onClick={handleCreateBill}
              >
                Create Bill
              </button>
            </div>
            <div className="overflow-auto">
              <table className="min-w-[640px] w-full  table-hover">
                <thead>
                  <tr className="border-separate">
                    <th class="w-24 text-center">Sr No.</th>
                    <th class="w-32">Invoice No</th>
                    <th class="w-32">PartyName</th>
                    <th class="w-32">Paid Amount</th>
                    <th class="w-32">Due Amount</th>
                    <th class="w-32">Bill Date</th>
                    <th class="w-32">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData &&
                    filteredData
                      .filter(applyFilters)
                      .sort(sortRecords)
                      .map((item, index) => (
                        <tr key={index}>
                          <td className="text-center">{index + 1}</td>
                          {displayFields.map((field) => (
                            <td className="text-center " key={field}>
                              {item[field] === "" ? "-" : item[field]}
                            </td>
                          ))}
                          <td className=" space-x-5 justify-evenly  text-center ">
                            <button
                              className="text-black dark:text-white/80 px-3"
                              onClick={() => handlePrintClick(item["id"])}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="w-5 h-5 inline-block"
                                fill="none"
                                stroke="#000000"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                                <rect x="6" y="14" width="12" height="8"></rect>
                              </svg>
                            </button>
                            <button
                              className="text-black dark:text-white/80 px-3"
                              onClick={() => handleUpdateClick(index)}
                              type="submit"
                            >
                              <svg
                                xmlns=" http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="w-5 h-5 inline-block"
                              >
                                <path
                                  fill="currentColor"
                                  d="M5 18.89H6.41421L15.7279 9.57629L14.3137 8.16207L5 17.4758V18.89ZM21 20.89H3V16.6474L16.435 3.21233C16.8256 2.8218 17.4587 2.8218 17.8492 3.21233L20.6777 6.04075C21.0682 6.43128 21.0682 7.06444 20.6777 7.45497L9.24264 18.89H21V20.89ZM15.7279 6.74786L17.1421 8.16207L18.5563 6.74786L17.1421 5.33365L15.7279 6.74786Z"
                                ></path>
                              </svg>
                            </button>
                            <button
                              className="text-danger ms-2 px-3 "
                              onClick={() => handleButtonClick(item["id"])}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="w-5 h-5 inline-block"
                              >
                                <path
                                  fill="currentColor"
                                  d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"
                                ></path>
                              </svg>
                            </button>
                          </td>
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

export default Billingrecord;
