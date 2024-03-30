import React, { useEffect } from "react";
import { useState } from "react";

import units from "./unit";
import { useDispatch, useSelector } from "react-redux";
import { items_create, items_get, items_update } from "../reducer/Item_reducer";
import { ToastContainer, toast } from "react-toastify";

const ItemMaster = ({ data, mode, closeModal }) => {
  const [inputs, setInput] = useState({
    name: "",
    unit: "",
    openingStock: "",
    closingStock: "",
    HSN: "",
    GST: "",
    salePrice: "",
    purchasePrice: "",
  });

  useEffect(() => {
    if (mode === "update") {
      setInput(data);
    }
  }, [data]);

  const dispatch = useDispatch();

  const handelchange = (e) => {
    const { name, value } = e.target;

    // Validate "name" field to accept only characters
    if (name === "name") {
      // Regular expression to match only characters (alphabets)
      const regex = /^[a-zA-Z\s]*$/;
      // Check if the input value matches the regular expression
      if (regex.test(value)) {
        // Show error message if the value contains non-alphabet characters
        setInput({ ...inputs, [name]: value });
        return;
      } else {
        return;
      }
    }

    // Skip validation for "unit" field
    if (name === "unit") {
      setInput({ ...inputs, [name]: value });
      return;
    }

    // Convert value to a number for other fields
    const numericValue = parseFloat(value);
    // Check if the value is negative
    if (numericValue < 0) {
      // Set border color to red
      e.target.style.borderColor = "red";
      // Show the error message
      toast.error("Value should not be negative", { position: "top-center" });
    } else {
      // Reset border color to default
      e.target.style.borderColor = "#CBD5E0"; // You may need to adjust this value according to your design
      // Update the state with the new value
      setInput({ ...inputs, [name]: numericValue });
    }
  };

  const msg = useSelector((state) => state.ItemReducer.result["flag"]);

  const handelSubmit = (e) => {
    e.preventDefault();

    try {
      dispatch(items_create(inputs));
      dispatch(items_get());
      closeModal();
    } catch (err) {
      console.log(err);
    }

    if (msg === true) {
      toast.success("Sucessfull", "sucess");
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    try {
      dispatch(items_update(inputs));
      dispatch(items_get());
      closeModal();
    } catch {}

    if (msg === true) {
      toast.success("Sucessfull", "sucess");
    }
  };

  const unitList = Object.values(units);
  return (
    <>
      <div>
        <form className=" bg-white rounded mb-8   " onSubmit={handelSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 pt-10 px-4">
            <h2 className="col-span-full text-center mb-4 text-[#225777] text-2xl font-bold">
              Items
            </h2>
            <div className="mb-4">
              <label className="block text-black text-sm  mb-2">Name</label>
              <input
                required
                type="text"
                className="form-input border border-gray-400 w-full h-10 rounded-md"
                onChange={handelchange}
                name="name"
                value={inputs.name}
              />
            </div>
            <div className="mb-4">
              <label className="block text-black text-sm  mb-2">Hsn Code</label>
              <input
                type="text"
                name="HSN"
                onChange={handelchange}
                value={inputs.HSN}
                className="form-input border border-gray-400 w-full h-10 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-black text-sm  mb-2">Unit</label>
              <select
                name="unit"
                required
                value={inputs.unit}
                onChange={handelchange}
                className="form-input border border-gray-400 w-30 h-10 rounded-md"
              >
                <option value="">Select unit</option>
                {unitList.map((items, index) => {
                  return (
                    <option key={index} value={items.name}>
                      {items.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-4 relative">
              <label className="block text-black text-sm  mb-2">
                Opening Stock
              </label>
              <div className="relative">
                <input
                  type="number"
                  required
                  defaultValue={0}
                  name="openingStock"
                  onChange={handelchange}
                  value={inputs.openingStock}
                  className="form-input border border-gray-400 w-full h-10 rounded-md"
                />
              </div>
            </div>
            <div className="mb-4 relative">
              <label className="block text-black text-sm  mb-2">
                Minimum Stock
              </label>
              <div className="relative">
                <input
                  type="number"
                  defaultValue={0}
                  required
                  name="closingStock"
                  onChange={handelchange}
                  value={inputs.closingStock}
                  className="form-input border border-gray-400 w-full h-10 rounded-md"
                />
              </div>
            </div>
            <div className="mb-4 relative">
              <label className="block text-black text-sm  mb-2">
                Sale Price
              </label>
              <div className="relative">
                <input
                  type="number"
                  required
                  defaultValue={0}
                  name="salePrice"
                  onChange={handelchange}
                  value={inputs.salePrice}
                  className="form-input border border-gray-400 w-full h-10 rounded-md"
                />
              </div>
            </div>
            <div className="mb-4 relative">
              <label className="block text-black text-sm mb-2">
                Purchase Price
              </label>
              <div className="relative">
                <input
                  type="number"
                  required
                  defaultValue={0}
                  name="purchasePrice"
                  onChange={handelchange}
                  value={inputs.purchasePrice}
                  className="form-input border border-gray-400 w-full h-10 rounded-md"
                />
              </div>
            </div>
            <div className="mb-4 relative">
              <label className="block text-black text-sm mb-2">Gst</label>
              <div className="relative">
                <input
                  type="number"
                  name="GST"
                  required
                  onChange={handelchange}
                  value={inputs.GST}
                  className="form-input border border-gray-400 w-full h-10 rounded-md"
                />
                <span className="absolute inset-y-0 right-2 flex items-center pr-6 text-gray-400 disabled:">
                  %
                </span>
              </div>
            </div>
          </div>
          <div className=" flex items-center m-auto justify-center pt-5">
            {mode == "add" && (
              <button
                className="btn   flex items-center justify-center text-sm bg-[#225777] border border-[#225777] rounded-md text-white transition-all duration-300 hover:bg-[#173054] hover:border-[#173054]"
                type="submit"
              >
                ADD INVENTORIES
              </button>
            )}
            {mode == "update" && (
              <button
                className="btn   flex items-center justify-center text-lg bg-[#225777] border border-[#225777] rounded-md text-white transition-all duration-300 hover:bg-[#173054] hover:border-[#173054]"
                type="button"
                onClick={handleUpdate}
              >
                UPDATE
              </button>
            )}
          </div>
        </form>
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
      </div>
    </>
  );
};

export default ItemMaster;
