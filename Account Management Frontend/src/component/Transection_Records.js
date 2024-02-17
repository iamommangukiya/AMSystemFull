import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "sweetalert2/dist/sweetalert2.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {

  transction_Records,
} from "../reducer/Trasction_reducer";

const Trasection_Records = () => {
  const dispatch = useDispatch();

  var result = useSelector(
    (state) => state.TransctionReducer.transectionReports?.data
  );
  useEffect(() => {
    dispatch(transction_Records());
  }, []);

  const tableHeader = ["AccountFrom", "AccountTo", "transectionType", "Amount"];

  return (
    <>
      <div></div>
      <div className="flex flex-col gap-4 min-h-[calc(100vh-212px)]">
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white border border-black/10 p-5 rounded dark:bg-darklight dark:border-darkborder">
            <div className="flex  justify-between text-center">
             
            </div>

            <div className="overflow-auto">
             

              <table className="min-w-[640px] w-full mt-4 table-hover">
                <thead>
                  <tr className="border-separate">
                    <th className="w-32">index</th>
                    <th className="w-32">AccountFrom</th>
                    <th className="w-32">AccountTo</th>

                    <th className="w-32">trasctionType</th>
                    <th className="w-24">amount</th>
                    <th className="w-24">Action</th>
                  </tr>
                </thead>

                <tbody>
  {result ? (
    result.map((item, index) => (
      <tr key={index}>
        <td className="text-center">{index + 1}</td>
        {tableHeader.map((field) => (
          <td className="text-center" key={field}>
            {item[field]}
          </td>
        ))}
      
      
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={tableHeader.length + 1} className="text-center">
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

export default Trasection_Records;
