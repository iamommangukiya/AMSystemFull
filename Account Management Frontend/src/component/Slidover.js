import React, { useEffect, useState } from "react";

const Slidover = ({ isOpen, toggleSlideover, inventoryItems, selectItem }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const selctionHandler = (items) => {
    setSelectedItems([...selectedItems, items]);
  };

  const btnhandel = () => {
    selectItem(selectedItems);
    console.log(selectedItems);
    toggleSlideover();
  };
  useEffect(() => {
    if (!isOpen) {
      setSelectedItems([]);
    }
  }, [toggleSlideover]);

  return (
    <div
      id="slideover-container"
      className={`w-full h-full fixed inset-0 ${isOpen ? "" : "invisible"}`}
    >
      <div
        id="slideover-bg"
        onClick={toggleSlideover}
        className={`w-full h-full duration-500 z-20 ease-out transition-all inset-0 absolute bg-gray-900 ${
          isOpen ? "opacity-50" : "opacity-0"
        }`}
      ></div>
      <div
        id="slideover"
        className={`w-96 bg-white h-full absolute z-[9999]  right-0 duration-300 ease-out transition-all ${
          isOpen ? "" : "translate-x-full"
        }`}
      >
        <div
          onClick={toggleSlideover}
          className="absolute cursor-pointer text-gray-600 top-0 w-8 h-8 flex items-center justify-center right-0 mt-5 mr-5"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>
        <div className="flex justify-between flex-col h-full">
          <ul>
            {inventoryItems?.map((item, index) => (
              <li
                key={index}
                onClick={() => selctionHandler(item)}
                className="cursor-pointer"
              >
                {item.name}
              </li>
            ))}
          </ul>
          <button className="btn bg-black text-white" onClick={btnhandel}>
            {" "}
            Add{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slidover;
