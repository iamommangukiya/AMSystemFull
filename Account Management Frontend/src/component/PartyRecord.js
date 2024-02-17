import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AccountGrop,
  apipartyGet,
  partyAction,
  partyDelete,
} from "../reducer/Party_reducer";
import Party from "../pages/Party";

import React_Modal from "./ReactModal";

const PartyRecord = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [mode, setMode] = useState();
 
  const [editedValues, setEditedValues] = useState({});

  var result = useSelector((state) => state.PartyReducer.result.data);
  const msg = useSelector((state) => state.PartyReducer.resultparty?.flag);
  const updateMsg = useSelector(
    (state) => state.PartyReducer.party_upadte?.flag
  );
  useEffect(() => {
    dispatch(AccountGrop());
    if (msg === true) {
      toast.success("Successfull", "sucess");
      dispatch(partyAction.addpartyEmpty());
      // dispatch(partyAction.resultEmpty());
    }
    if (updateMsg === true) {
      toast.success("updated");
      dispatch(partyAction.updatepartyEmpty());
    }
  }, [dispatch, msg, updateMsg]);

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

        dispatch(partyDelete(index));
        dispatch(apipartyGet());
      }
    });
  };
  const closeModal = () => {
    setModal(false);
  };
  const handleUpdateClick = (index) => {
    setMode("update");
   
    setEditedValues(result[index]);
    setModal(true);
  };
  useEffect(() => {
    dispatch(apipartyGet());
  }, [dispatch]);

  if (!result || !Array.isArray(result)) {
    return (
      <div className="flex justify-between items-center text-2xl">

    No Data...
  
  <div className="ml-auto">
    <button
      onClick={() => {
        setEditedValues({});
        setMode("add");
        setModal(true);
      }}
      className="btn py-2 px-3 text-lg bg-purple border border-purple rounded-md text-white transition-all duration-300 hover:bg-purple/[0.85] hover:border-purple/[0.85]"
    >
      ADD PARTY
    </button>
  </div>
  <React_Modal isOpen={modal} closeModal={closeModal}>
    <Party data={editedValues} mode={mode} />
  </React_Modal>
</div>

    
    );
  }
  const displayFields = [
    "partyName",
    "phoneNumber",
    "accountGroup",
    "pan",
    "gstNumber",
  ];
  const handleshow = (index) => {
   
    setEditedValues(result[index]);
    setModal(true);
    setMode()
  };
  return (
    <>
      <div>
        <React_Modal isOpen={modal} closeModal={closeModal}>
          <Party data={editedValues} mode={mode} />
        </React_Modal>
      </div>
      <div className="flex flex-col gap-4 min-h-[calc(100vh-212px)]">
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white border border-black/10 p-3 rounded dark:bg-darklight dark:border-darkborder">
            <div className="flex  justify-end  text-center">
             
              <button
                onClick={() => {
                  setEditedValues("");
                  setMode("add");
                  setModal(true);
                }}
                className="btn  py-2 mb-4 px-3 text-sm bg-purple border border-purple rounded-md text-white transition-all duration-300 hover:bg-purple/[0.85] hover:border-purple/[0.85]"
              >
                ADD PARTY
              </button>
            </div>

            <div className="overflow-auto">
             

              <table className="min-w-[640px] w-full  table-hover">
                <thead>
                  <tr className="border-separate">
                    <th class="w-24 text-center">Index</th>
                    <th class="w-32">PartyName</th>
                    <th class="w-32">PhoneNumber</th>
                    <th class="w-32">AccountGroup</th>
                    <th class="w-32">Pan</th>
                    <th class="w-32">GstNumber</th>
                    <th class="w-32">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {result.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center">{index + 1}</td>
                      {displayFields.map((field) => (
                        <td className="text-center " key={field}>
                          {item[field]}
                        </td>
                      ))}
                      <td className=" space-x-5 justify-evenly  text-center ">
                        <button
                          className="text-danger ms-2 px-3 "
                          onClick={() => handleButtonClick(item["ID"])}
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
                          className="text-black dark:text-white/80 px-3"
                          onClick={() => {
                            handleshow(index);
                          }}
                        >
                          <svg
                            height="50px"
                            xmlns=" http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-5 h-5 inline-block"
                            fill="#000000"
                          >
                            <path
                              fill="currentColor"
                              d="M1 10c0-3.9 3.1-7 7-7s7 3.1 7 7h-1c0-3.3-2.7-6-6-6s-6 2.7-6 6H1zm4 0c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3-3-1.3-3-3zm1 0c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z"
                            />
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

export default PartyRecord;
