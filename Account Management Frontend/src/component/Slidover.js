import React, { useEffect, useState } from "react";

const Slidover = ({ isOpen, toggleSlideover, inventoryItems, selectItem }) => {
  const [selectedItems, setSelectedItems] = useState({});

  const selctionHandler = (item) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = { ...prevSelectedItems };
      if (updatedSelectedItems[item.id]) {
        updatedSelectedItems[item.id].qty += 1; // Increase quantity if already selected
      } else {
        updatedSelectedItems[item.id] = { ...item, qty: 1 }; // Add item with quantity 1
      }
      return updatedSelectedItems;
    });
  };

  const btnhandel = () => {
    const selectedItemsArray = Object.values(selectedItems).map((items) => ({
      ...items,
      amount:
        items.salePrice * items.qty +
        items.qty * items.salePrice * (items.GST / 100),
    }));
    // console.log(selectedItemsArray);
    selectItem(selectedItemsArray);
    toggleSlideover();
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectedItems({});
    }
  }, [isOpen]);

  return (
    <div
      id="slideover-container"
      className={`w-full h-full fixed inset-0 ${isOpen ? "" : "invisible"}`}
    >
      <div
        id="slideover-bg"
        onClick={toggleSlideover}
        className={`w-full h-full duration-500 z-50 ease-out transition-all inset-0 absolute bg-gray-900 ${
          isOpen ? "opacity-50" : "opacity-0"
        }`}
      ></div>
      <div
        id="slideover"
        className={`w-96 bg-white h-full absolute z-50 right-0 duration-300 ease-out transition-all ${
          isOpen ? "" : "translate-x-full"
        }`}
      >
        <div
          onClick={toggleSlideover}
          className="absolute cursor-pointer text-gray-600 top-0 w-8 h-8 flex items-center justify-center right-0 mr-5"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>
        <div>
          <p className="mt-10 text-center text-3xl font-bold">Select Items</p>
        </div>

        <div className="flex flex-col justify-between">
          <ul>
            {inventoryItems?.map((item, index) => (
              <li
                key={index}
                onClick={() => selctionHandler(item)}
                className={`cursor-pointer h-10 bg-slate-200 mt-3 p-4 mx-3 flex  justify-right items-center  ${
                  selectedItems[item.id] ? "bg-gray-400" : ""
                }`}
              >
                <span>{item.name}</span>
                {selectedItems[item.id] && (
                  <span className="ml-2 text-sm">
                    Quantity: {selectedItems[item.id].qty}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <button
            className="btn bg-black text-white visible"
            onClick={btnhandel}
          >
            {" "}
            Add{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slidover;
