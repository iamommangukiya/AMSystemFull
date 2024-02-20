import React, { useEffect } from "react";
import { useState } from "react";

import units from "./unit";
import { useDispatch, useSelector } from "react-redux";
import { items_create, items_get, items_update } from "../reducer/Item_reducer";
import { ToastContainer, toast } from "react-toastify";

const ItemMaster = ({ data, mode, closeBox }) => {
  const [inputs, setInput] = useState({
    name: "",
    unit: "",
    openingStock: "0",
    closingStock: "0",
    HSN: "",
    gst: "0",
  });
  useEffect(() => {
    setInput(data);
  }, [data]);
  const dispatch = useDispatch();
  const handelchange = (e) => {
    const { name, value } = e.target;
    setInput({ ...inputs, [name]: value });
  };
  console.log(mode);

  const msg = useSelector((state) => state.ItemReducer.result["flag"]);
  console.log(msg);

  const handelSubmit = (e) => {
    e.preventDefault();

    try {
      dispatch(items_create(inputs));
      dispatch(items_get());
    } catch {}

    if (msg === true) {
      toast.success("Sucessfull", "sucess");
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    try {
      dispatch(items_update(inputs));
      dispatch(items_get());
      closeBox();
    } catch {}

    if (msg === true) {
      toast.success("Sucessfull", "sucess");
    }
  };

  const unitList = Object.values(units);
  return (
    <>
      <div className="flex items-center  justify-center mb-8 bg-gray-100 ">
        <form
          className=" bg-white shadow-md mt-10 rounded  pt-3 pb-2 mb-8   "
          onSubmit={handelSubmit}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 py-2 px-4">
            <h2 className="col-span-full text-center mb-4 text-primary text-2xl font-bold">
              Items
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                required
                type="text"
                className="form-input border border-primary w-full rounded-xl"
                onChange={handelchange}
                name="name"
                value={inputs.name}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Hsn Code
              </label>
              <input
                type="text"
                required
                name="HSN"
                onChange={handelchange}
                value={inputs.HSN}
                className="form-input border border-primary w-full rounded-xl"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Unit
              </label>
              <select
                defaultValue={0}
                name="unit"
                onChange={handelchange}
                className="form-input border border-primary w-30 rounded-xl"
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
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Opening Stock
              </label>
              <div className="relative">
                <input
                  type="number"
                  defaultValue={0}
                  name="openingStock"
                  onChange={handelchange}
                  value={inputs.openingStock}
                  className="form-input border border-primary w-full  rounded-xl"
                />
              </div>
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Closing Stock
              </label>
              <div className="relative">
                <input
                  type="number"
                  defaultValue={0}
                  name="closingStock"
                  onChange={handelchange}
                  value={inputs.closingStock}
                  className="form-input border border-primary w-full  rounded-xl"
                />
              </div>
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Sale Price
              </label>
              <div className="relative">
                <input
                  type="number"
                  defaultValue={0}
                  name="salePrice"
                  onChange={handelchange}
                  value={inputs.salePrice}
                  className="form-input border border-primary w-full  rounded-xl"
                />
              </div>
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Purchase Price
              </label>
              <div className="relative">
                <input
                  type="number"
                  defaultValue={0}
                  name="purchasePrice"
                  onChange={handelchange}
                  value={inputs.purchasePrice}
                  className="form-input border border-primary w-full  rounded-xl"
                />
              </div>
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Gst
              </label>
              <div className="relative">
                <input
                  type="number"
                  defaultValue={0}
                  name="gst"
                  onChange={handelchange}
                  value={inputs.gst}
                  className="form-input border border-primary w-full  rounded-xl"
                />
                <span className="absolute inset-y-0 right-2 flex items-center pr-6 text-gray-400 disabled:">
                  %
                </span>
              </div>
            </div>
          </div>
          <div className=" flex items-center m-auto justify-center">
            {mode == "add" && (
              <button
                className="btn   flex items-center justify-center text-lg bg-purple border border-purple rounded-md text-white transition-all duration-300 hover:bg-purple/[0.85] hover:border-purple/[0.85]"
                type="submit"
              >
                Add Product
              </button>
            )}
            {mode == "update" && (
              <button
                className="btn   flex items-center justify-center text-lg bg-purple border border-purple rounded-md text-white transition-all duration-300 hover:bg-purple/[0.85] hover:border-purple/[0.85]"
                type="button"
                onClick={handleUpdate}
              >
                update
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
