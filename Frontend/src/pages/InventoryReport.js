import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { items_delete, items_get, items_update } from "../reducer/Item_reducer";
import * as XLSX from "xlsx";
import "sweetalert2/dist/sweetalert2.min.css";
import { saveAs } from "file-saver";

const InventoryReport = () => {
  const [filterDate, setFilterDate] = useState([]);
  const [Modal, setModal] = useState(false);
  const [Mode, setMode] = useState("add");

  const dispatch = useDispatch();

  const result = useSelector((state) => state.ItemReducer.result?.data);
  useEffect(() => {
    if (result?.length > 0) {
      // Filter items where current stock is less than closing stock
      const filteredItems = result.filter(
        (item) => item.openingStock < item.closingStock
      );
      setFilterDate(filteredItems);
    }
  }, [result]);

  useEffect(() => {
    dispatch(items_get());
  }, [Modal]);
  const exportToExcel = () => {
    // Selecting only required fields from filtered data
    const dataToExport = filterDate.map((item) => ({
      Name: item.name,

      CurrentQuantity: item.openingStock,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "InventoryReport.xlsx");
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
  if (filterDate.length == 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-2xl">
          All inventory items have sufficient quantity
        </p>
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col gap-4 min-h-[calc(100vh-212px)]">
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white border border-black/10 p-5 rounded dark:bg-darklight dark:border-darkborder">
            <div className="flex justify-between">
              <input
                type="text"
                placeholder="search"
                className="w-50 rounded-md border-[#225777] placeholder:text-[#225777] focus:border-0"
                onChange={handelSerchChange}
              />
              <button
                onClick={exportToExcel}
                className="bg-[#225777] text-white px-4 py-2 rounded-md mr-2"
              >
                Export to Excel
              </button>
            </div>
            <div className="overflow-auto">
              <table className="min-w-[640px] w-full mt-4  table-auto justify-center text-center ">
                <thead>
                  <tr className="border-separate">
                    <th className="w-20">Id</th>
                    <th className="w-32">Name</th>
                    <th className="w-24">Unit</th>
                    <th className="w-24">Current Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {filterDate.map((item, index) => (
                    <tr key={index}>
                      {console.log(item)}
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.unit}</td>
                      <td>{item.openingStock}</td>
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

export default InventoryReport;
