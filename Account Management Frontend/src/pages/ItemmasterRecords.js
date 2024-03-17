import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { items_delete, items_get, items_update } from "../reducer/Item_reducer";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import ReactModal from "react-modal";
import React_Modal from "../component/ReactModal";
import ItemMaster from "./ItemMaster";
import { disabledTime } from "rsuite/esm/utils/dateUtils";
const ItemmasterRecords = () => {
  const [showDate, setShowData] = useState(false);
  const [editIndex, setIndex] = useState(-1);
  const [editValues, setValues] = useState({});

  const [filterDate, setFilterDate] = useState([]);
  const [Modal, setModal] = useState(false);
  const [Mode, setMode] = useState("add");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(items_get());
  }, [dispatch]);
  const closemodal = () => {
    setModal(false);
  };
  const handleUpdateClick = (index) => {
    setIndex(index);
    setValues(result[index]);
    setModal(true);
    setMode("update");
  };

  const result = useSelector((state) => state.ItemReducer.result?.data);
  useEffect(() => {
    if (result?.length > 0) {
      setFilterDate(result);
    }
  }, [result]);

  if (!result || !Array.isArray(result)) {
    return (
      <>
        <div className=" flex justify-between text-lg">
          <p></p>
          <p>No Data...</p>
          <button
            onClick={() => {
              setModal(true);
              setMode("add");
              // console.log(Mode);
            }}
            className="btn py-2 px-3 text-lg bg-purple border border-purple rounded-md text-white transition-all duration-300 hover:bg-purple/[0.85] hover:border-purple/[0.85]"
          >
            Add Product
          </button>
        </div>
        <div>
          <React_Modal isOpen={Modal} closeModal={closemodal}>
            <ItemMaster data={editValues} mode={Mode}></ItemMaster>
          </React_Modal>
        </div>
      </>
    );
  }

  const handelDeletebtn = async (index) => {
    const result = await Swal.fire({
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

        dispatch(items_delete(index));
        dispatch(items_get());
        setShowData(false);
      }
    });
  };

  const handelSerchChange = (e) => {
    filter(e.target.value);
  };
  const filter = (query) => {
    var filteredDate = result.filter(
      (item) =>
        item &&
        item.name &&
        item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilterDate(filteredDate);
  };

  const displayedData = showDate ? result : result.slice(0, 10);

  return (
    <>
      <div>
        <React_Modal isOpen={Modal} closeModal={closemodal}>
          <ItemMaster data={editValues} mode={Mode}></ItemMaster>
        </React_Modal>
      </div>
      <div className="flex flex-col gap-4 min-h-[calc(100vh-212px)]">
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white border border-black/10 p-5 rounded dark:bg-darklight dark:border-darkborder">
            <div className="flex justify-between">
              <input
                type="text"
                placeholder="serch"
                className=" rounded-xl border-[#6420AA] placeholder:text-[#6420AA] focus:border-0"
                onChange={handelSerchChange}
              />
              <button
                onClick={() => {
                  setModal(true);
                  setMode("add");
                }}
                className="btn py-2 px-3 text-lg bg-[#6420AA] border border-[#6420AA] rounded-md text-white transition-all duration-300 hover:bg-[#492E87] hover:border-[#492E87]"
              >
                Add Product
              </button>
            </div>
            <div className="overflow-auto">
              <table className="min-w-[640px] w-full mt-4  table-auto justify-center text-center ">
                <thead>
                  <tr className="border-separate">
                    <th className="w-20">Id</th>
                    <th className="w-32">Name</th>
                    <th className="w-24">Unit</th>
                    <th className="w-32">purchase price</th>
                    <th className="w-20">Gst%</th>
                    <th className="w-20">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filterDate.map((item, index) => (
                    <tr key={index}>
                      {/* {console.log(item)} */}
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.unit}</td>
                      <td>
                        {item.purchasePrice == null ? "-" : item.purchasePrice}
                      </td>
                      <td>{item.GST == "undefined" ? "-" : item.GST + "%"}</td>
                      <td>
                        <button
                          className="text-[#F69314] ms-2"
                          onClick={() => handelDeletebtn(item.id)}
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

export default ItemmasterRecords;
