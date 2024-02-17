import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { items_delete, items_get, items_update } from "../reducer/Item_reducer";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
const ItemmasterRecords = () => {
  const [showDate, setShowData] = useState(false);
  const [editIndex, setIndex] = useState(-1);
  const [editValues, setValues] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(items_get());
  }, [dispatch]);

  const result = useSelector((state) => state.ItemReducer.result?.data);

  if (!result || !Array.isArray(result)) {
    return <div className="justify-center text-center text-lg">No Data...</div>;
  }

  const handleDoubleClick = (index) => {
    setIndex(index);
    setValues(result[index]);
  };

  const onHandleChange = (e, key) => {
    setValues({ ...editValues, [key]: e.target.value });
  };
  // const handleButtonClick = (index) => {
  //   dispatch(items_delete(index));

  //   // console.log(index);
  //   dispatch(items_get());

  //   setShowData(false);
  // };

  const handleButtonClick = async (index) => {
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

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(items_update(editValues));
    dispatch(items_get());
    setIndex(-1);
  };

  const displayedData = showDate ? result : result.slice(0, 10);

  return (
    <>
      <div className="flex flex-col gap-4 min-h-[calc(100vh-212px)]">
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white border border-black/10 p-5 rounded dark:bg-darklight dark:border-darkborder">
            <h2 className="text-base font-semibold text-black dark:text-white/80 mb-4 capitalize">
              Table Editable
            </h2>
            <div className="overflow-auto">
              <span className="text-muted">
                Text Double Click To Edit Table.
              </span>
              <table className="min-w-[640px] w-full mt-4 table-hover justify-center text-center ">
                <thead>
                  <tr className="border-separate">
                    <th className="w-20">Id</th>
                    <th className="w-32">Name</th>
                    <th className="w-24">Unit</th>
                    <th className="w-32">Hsn</th>
                    <th className="w-20">Gst</th>
                    <th className="w-20">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedData.map((item, index) => (
                    <tr key={index}>
                      {Object.entries(item).map(([key, value]) => (
                        <td
                          key={key}
                          onDoubleClick={() => handleDoubleClick(index)}
                        >
                          {editIndex === index ? (
                            <input
                              type="text"
                              value={editValues[key] || ""}
                              onChange={(e) => onHandleChange(e, key)}
                            />
                          ) : (
                            value
                          )}
                        </td>
                      ))}
                      <td>
                        <button
                          className="text-danger ms-2"
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

                        {editIndex === index && (
                          <button
                            className="text-danger ms-2"
                            onClick={handleSave}
                          >
                            Save
                          </button>
                        )}
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
