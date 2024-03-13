import React, { useEffect, useState } from "react";
import {
  UpdateBillog,
  addbill,
  billingaction,
  getItemsOfBill,
  getletestInvoceId,
} from "../reducer/billing_reducer";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Slidover from "../component/Slidover";
import { items_get } from "../reducer/Item_reducer";
import { useNavigate, useLocation } from "react-router-dom";
import { use } from "i18next";

const Biling = () => {
  const location = useLocation(); // Hook to access the current location object
  const mode = location.state?.mode || ""; // Get the mode from the state
  const editdata = location.state?.data;
  // console.log(editdata);
  let bookName = "";
  switch (mode) {
    case "sales":
      bookName = "SalesBook";
      break;
    case "purchase":
      bookName = "PurchaseBook";
      break;
    case "asimat":
      bookName = "AsimatBill";
      break;
    case "delivery":
      bookName = "DeliveryBill";
      break;
    default:
      bookName = "";
      break;
  }

  const [isOpen, setIsopen] = useState(false);
  const [Inputs, setInputs] = useState({
    invoiceNo: "",
    dueAmount: "",
    paidAmount: "",
    payAmount: "",
    invoiceDate: new Date().toISOString().split("T")[0], // Set initial value to today's date
    dueDate: new Date().toISOString().split("T")[0], // Set initial value to today's date
    bPartyName: "",
    bPartyAdress: "",
    oGSTIN: "",
    bStateCode: "",
    pgstNo: "",
    totalQuantity: "",
    gtotalAmount: "",
    discount: 0,
    totalTaxable: 0,
    totalSgst: "",
    totalCgst: "",
    totalIGst: "",
    tcs: "",
    totalAmount: "",
    flag: "",
    transportDate: new Date().toISOString().split("T")[0],
    bookName: bookName,
    transactionStatus: "",
    isGstBill: false,
    kasar: "",
    transactionType: "unpaid",
    deliveryAdress: "",
    items: [
      {
        id: 1,
        item: "",
        description: "",
        purchasePrice: "",
        qty: "",
        amount: "",
      },
    ],
  });

  const [isChecked, setIsChecked] = useState(false);
  const [inventoryItems, setInventoryItems] = useState([]);
  const dispatch = useDispatch();
  // slider item
  useEffect(() => {
    if (editdata) {
      dispatch(getItemsOfBill(editdata.id));
      setInputs({ ...editdata });
    } else {
      setInputs((prevInputs) => ({
        ...prevInputs,
        items: [
          {
            id: 1,
            item: "",
            description: "",
            purchasePrice: "",
            qty: "",
            amount: "",
          },
        ],
      }));
    }
  }, [editdata]);

  useEffect(() => {
    if (mode === "purchase") {
      setInputs((prevstate) => ({ ...prevstate, flag: "P" }));
    } else if (mode == "sale") {
      setInputs((prevstate) => ({ ...prevstate, flag: "s" }));
    }
    dispatch(items_get());
    dispatch(getletestInvoceId());
  }, []);
  //use for asto increment invoice no
  // const InvoiceNo = useSelector((state) => state.BillingReducer.InvoiceID.data);

  const ItemData = useSelector((state) => state.ItemReducer.result?.data);

  useEffect(() => {
    setInventoryItems(ItemData);
  }, [ItemData]);

  const BillingItem = useSelector(
    (state) => state.BillingReducer.billItems?.data
  );

  // Inside the useEffect hook where findItemDetails is called
  useEffect(() => {
    if (BillingItem) {
      const result = findItemDetails(BillingItem, ItemData);
      // console.log(result, "result");
      // Update the state with the result
      setInputs((prevInputs) => ({
        ...prevInputs,
        items: result,
      }));
    }
  }, [BillingItem, ItemData]);

  // Inside the findItemDetails function
  function findItemDetails(billItems, items) {
    const result = [];
    if (
      !billItems ||
      !Array.isArray(billItems) ||
      !items ||
      !Array.isArray(items)
    ) {
      console.error("Invalid input arrays.");
      return result;
    }

    billItems.forEach((billItem) => {
      const item = items.find((item) => item.id === parseInt(billItem.itemId));
      if (item) {
        result.push({
          id: item.id,
          name: item.name,
          description: item.description,
          salePrice: billItem.unitCost,
          qty: billItem.qty,
          GST: billItem.gst,
          amount: billItem.amount,
        });
      }
    });
    return result;
  }

  const toggleslider = () => {
    setIsopen(!isOpen);
  };

  const selectItem = (selectedItems) => {
    const newItems = selectedItems.map((selectedItem) => ({
      ...selectedItem,
      itmnumber: Inputs.items.length + 1,
    }));

    const totalQuantity = newItems.reduce(
      (totalQty, item) => totalQty + parseFloat(item.qty) || 0,
      0
    );

    const totalTaxable = 0;

    const totalAmount = newItems.reduce(
      (total, item) => total + parseFloat(item.amount * item.qty),
      0
    );
    // console.log(totalAmount, "itemsSelect");

    setInputs((prevInputs) => ({
      ...prevInputs,
      items: [...prevInputs.items, ...newItems],
      totalQuantity: totalQuantity.toFixed(2),
      totalTaxable: totalTaxable.toFixed(2),
      gtotalAmount: totalAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
    }));
  };

  const HandleToggle = () => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      isGstBill: !Inputs.isGstBill,
    }));
  };

  const flag = useSelector((state) => state.BillingReducer.result.flag || {});

  if (flag === true) {
    toast.success("Sucessfull", "sucess");
    dispatch(billingaction.CleanInsertBill());
  }

  const handelchange = (e, index) => {
    const { name, value } = e.target;
    // Ensure paid amount does not exceed total amount
    if (
      name === "paidAmount" &&
      parseFloat(value) > parseFloat(Inputs.gtotalAmount)
    ) {
      // If paid amount exceeds total amount, set it to total amount
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: prevInputs.gtotalAmount,
      }));
      return; // Exit early to prevent further execution
    }
    if (index >= 0) {
      const updatedItems = Inputs.items.map((item, i) => {
        if (i === index) {
          const qty = name === "qty" ? parseFloat(value) || 0 : item.qty;
          const purchasePrice = parseFloat(item.salePrice) || 0;
          const GST = name === "GST" ? parseFloat(value) || 0 : item.GST;
          // Calculate the amount based on whether isGstBill is true or false
          const amount = Inputs.isGstBill
            ? (qty * purchasePrice + qty * purchasePrice * (GST / 100)).toFixed(
                2
              )
            : (qty * purchasePrice).toFixed(2);
          return {
            ...item,
            [name]: value,
            amount,
          };
        } else {
          return item;
        }
      });

      const discountedAmount = Inputs.totalAmount * (Inputs.discount / 100);

      const totalAmount = updatedItems.reduce(
        (total, item) => total + parseFloat(item.amount) || 0,
        0
      );

      const totalQuantity = updatedItems.reduce(
        (totalQty, item) => totalQty + parseFloat(item.qty) || 0,
        0
      );

      const calculatedGTotalAmount =
        totalAmount -
        discountedAmount +
        (totalAmount * Inputs.totalTaxable) / 100;

      setInputs((prevInputs) => ({
        ...prevInputs,
        items: updatedItems,
        totalAmount: totalAmount.toFixed(2),
        totalQuantity: totalQuantity.toFixed(2),
        gtotalAmount: calculatedGTotalAmount.toFixed(2),
        dueAmount: prevInputs.gtotalAmount - prevInputs.paidAmount,
      }));
    } else {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
        dueAmount:
          name === "paidAmount"
            ? prevInputs.gtotalAmount - value
            : prevInputs.dueAmount,
      }));
    }

    if (name === "item") {
      const newItemsCount = Inputs.items.length;
      setInputs((prevInputs) => ({
        ...prevInputs,
        totalItem: newItemsCount,
      }));
    }

    if (name === "discount") {
      const discountValue = parseFloat(value) || 0;
      const discountedAmount = Inputs.totalAmount * (discountValue / 100);

      const calculatedGTotalAmount =
        Inputs.totalAmount -
        discountedAmount +
        (Inputs.totalAmount * Inputs.totalTaxable) / 100;

      setInputs((prevInputs) => ({
        ...prevInputs,
        discount: discountValue,
        gtotalAmount: calculatedGTotalAmount.toFixed(2),
      }));
    }
  };

  const handleRadioChange = (e) => {
    const selectedTransactionType = e.target.value;

    if (selectedTransactionType === "unpaid") {
      setInputs((prevInputs) => ({
        ...prevInputs,
        transactionType: selectedTransactionType,
        dueAmount: parseFloat(prevInputs.gtotalAmount).toFixed(2), // Calculate due amount based on total amount and paid amount
        paidAmount: 0,
      }));
    } else {
      // For other transaction types, update the state normally
      setInputs((prevInputs) => ({
        ...prevInputs,
        transactionType: selectedTransactionType,
        paidAmount: prevInputs.gtotalAmount, // Set paid amount to total amount for other transaction types
        dueAmount: 0, // Set due amount to 0 for other transaction types
      }));
    }
  };

  const deleteRow = (index) => {
    const updatedItems = Inputs.items.filter((item, idx) => idx !== index);
    setInputs({ ...Inputs, items: updatedItems });
  };
  const SumbmitHandle = () => {
    // Filter out empty items
    const filteredItems = Inputs.items.filter(
      (item) => item && item.name && item.name.trim() !== ""
    );

    // Update the Inputs with filtered items
    setInputs((prevInputs) => ({
      ...prevInputs,
      items: filteredItems,
    }));

    // Dispatch the action to add the bill
    dispatch(addbill({ ...Inputs, items: filteredItems }));
    // console.log(insertId);
    // navigate("/dashboard/bill", { state: { insertId } });
  };
  const updateHandle = () => {
    const filteredItems = Inputs.items.filter(
      (item) => item && item.name && item.name.trim() !== ""
    );
    // Update the Inputs with filtered items
    setInputs((prevInputs) => ({
      ...prevInputs,
      items: filteredItems,
    }));
    dispatch(UpdateBillog({ ...Inputs, items: filteredItems }));
  };

  return (
    <>
      <Slidover
        isOpen={isOpen}
        selectItem={selectItem}
        toggleSlideover={toggleslider}
        inventoryItems={inventoryItems}
      ></Slidover>
      <div className=" flex-col min-h-screen justify-center flex items-center  dark:bg-darklight dark:border-darkborder">
        {/* <div className=" flex-col flex items-center py-4 bg-white shadow-md rounded   justify-center  "> */}
        <h2 className="col-span-full flex  justify-between text-2xl font-bold">
          <p>2
            {Inputs.isGstBill != true && mode == "sale" && "Sale Biling "}{" "}
            {Inputs.isGstBill != false && mode == "sale" && "GST Sale Biling"}
            {Inputs.isGstBill != false &&
              mode == "purchase" &&
              "GST purchase Biling"}
            {Inputs.isGstBill != true &&
              mode == "purchase" &&
              "purchase Biling"}
          </p>
          <div className="switch ps-2">
            <input type="checkbox" className="rounded-sm p-3" value={isChecked} onChange={HandleToggle} />
          </div>
        </h2>
        <form className="grid grid-cols-1   dark:bg-darklight dark:text-white dark:border-dark gap-3 md:grid-cols-2 py-5 lg:grid-cols-4 xl:grid-cols-4 pt-6  mb-4 ">
          {/* party start */}
          {/* // party name */}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              PartyName:
            </label>
            <input
              type="text"
              className="form-input border focus:border-0 border-gray-400 w-full rounded-md h-10"
              onChange={handelchange}
              name="bPartyName"
              value={Inputs.bPartyName}
            />
          </div>
          {/* // Party adress */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Bill PartyAdress:
            </label>
            <textarea
              type="text"
              className="form-input border focus:border-0 border-gray-400 w-full rounded-md h-10"
              onChange={handelchange}
              name="bPartyAdress"
              value={Inputs.bPartyAdress}
            />
          </div>
          {/* // state code */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Bill StateCode:
            </label>
            <input
              type="number"
              className="form-input border focus:border-0 border-gray-400 w-full rounded-md h-10"
              onChange={handelchange}
              name="bStateCode"
              value={Inputs.bStateCode}
            />
          </div>
          {/* // GstIn Party */}
          {Inputs.isGstBill == true && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Party GSTIN:
              </label>
              <input
                type="text"
                className="form-input border focus:border-0 border-gray-400 w-full rounded-md h-10"
                onChange={handelchange}
                name="pgstNo"
                value={Inputs.pgstNo}
              />
            </div>
          )}

          {/* party end */}

          {/* purchase details start */}

          {/* // bill no */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Invoice Number
            </label>
            <input
              type="text"
              className="form-input border focus:border-0 border-gray-400 w-full rounded-md h-10"
              onChange={handelchange}
              name="invoiceNo"
              value={Inputs.invoiceNo}
            />
          </div>
          {/* // date */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Invoice Date
            </label>
            <input
              type="date"
              className="form-input border focus:border-0 border-gray-400 w-full rounded-md h-10"
              onChange={handelchange}
              name="invoiceDate"
              value={Inputs.invoiceDate}
            />
          </div>
          {/* // due date */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Due Date
            </label>
            <input
              type="date"
              className="form-input border focus:border-0 border-gray-400 w-full rounded-md h-10"
              onChange={handelchange}
              name="dueDate"
              value={Inputs.dueDate}
            />
          </div>

          {/* gstno owner */}
          {Inputs.isGstBill == true && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                GSTIN:
              </label>
              <input
                type="number"
                className="form-input border focus:border-0 border-gray-400 w-full rounded-md h-10"
                onChange={handelchange}
                name="oGSTIN"
                value={Inputs.oGSTIN}
              />
            </div>
          )}

          {/* Transpose Date */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              TransportDate:
            </label>
            <input
              type="date"
              className="form-input border focus:border-0 border-gray-400 w-full rounded-md h-10"
              onChange={handelchange}
              name="transportDate"
              value={Inputs.transportDate}
            />
          </div>

          {/* gst %? */}
          {/* <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Total CGST:
              </label>
              <input
                type="number"
                className="form-input border border-primary w-full rounded-md h-10"
                onChange={handelchange}
                name="totalCgst"
                value={Inputs.totalCgst}
              />
            </div> */}
          {/* <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Total IGst:
              </label>
              <input
                type="number"
                className="form-input border border-primary w-full rounded-md h-10"
                onChange={handelchange}
                name="totalIGst"
                value={Inputs.totalIGst}
              />
            </div> */}

          {/* bookname */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Book Name:
            </label>
            <input
              type="text"
              className="form-input border focus:border-0 border-gray-400 w-full rounded-md h-10"
              onChange={handelchange}
              name="bookName"
              value={Inputs.bookName}
            />
          </div>
          {/* pay Amount */}
          {/* <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                PayAmount:
              </label>
              <input
                type="number"
                className="form-input border border-primary w-full rounded-md h-10"
                onChange={handelchange}
                name="payAmount"
                value={Inputs.payAmount}
              />
            </div> */}

          {/* <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                panding:
              </label>
              <input
                type="text"
                className="form-input border border-primary w-full rounded-md h-10"
                onChange={handelchange}
                name="panding"
                value={Inputs.panding}
              />
            </div> */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              deliveryAdress:
            </label>
            <input
              type="text"
              className="form-input border focus:border-0 border-gray-400 w-full rounded-md h-10"
              onChange={handelchange}
              name="deliveryAdress"
              value={Inputs.deliveryAdress}
            />
          </div>
        </form>

        <div class="block w-full overflow-auto scrolling-touch">
          <table
            class="w-full max-w-full mb-4 bg-transparent table-hover  dark:bg-darklight dark:text-white dark:border-darkborder bg-white"
            id="addTable"
          >
            <thead>
              <tr>
                <th>#</th>
                <th className="sm:w-1/5 pr-4 pl-4">Item</th>
                <th className="md:w-1/2 pr-4 pl-4">Description</th>
                <th>Unit Cost</th>
                <th>Qty</th>
                {Inputs.isGstBill == true && <th>GST%</th>}
                <th>Amount</th>
                <th> </th>
              </tr>
            </thead>
            <tbody className="tbodyone">
              {Inputs.items &&
                Inputs.items.map((row, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>
                      <input
                        type="text"
                        name="name"
                        className=" dark:bg-darklight focus:border-0"
                        value={row.name}
                        onChange={(e) => handelchange(e, index)}
                        disabled={index === 0 && Inputs.items.length === 1} // Disable the input if it's the first row and no other product is added
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="description"
                        className=" dark:bg-darklight focus:border-0"
                        value={row.description}
                        onChange={(e) => handelchange(e, index)}
                        disabled={index === 0 && Inputs.items.length === 1} // Disable the input if it's the first row and no other product is added
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className=" dark:bg-darklight focus:border-0"
                        inputMode="decimal"
                        name="salePrice"
                        value={row.salePrice}
                        onChange={(e) => handelchange(e, index)}
                        disabled={index === 0 && Inputs.items.length === 1} // Disable the input if it's the first row and no other product is added
                      />
                    </td>
                    <td>
                      <input
                        className=" dark:bg-darklight focus:border-0"
                        type="number"
                        name="qty"
                        defaultValue={1}
                        value={row.qty}
                        onChange={(e) => handelchange(e, index)}
                        disabled={index === 0 && Inputs.items.length === 1} // Disable the input if it's the first row and no other product is added
                      />
                    </td>
                    {Inputs.isGstBill == true && (
                      <td>
                        <input
                          type="number"
                          className=" dark:bg-darklight focus:border-0"
                          name="GST"
                          value={row.GST}
                          onChange={(e) => handelchange(e, index)}
                          disabled={index === 0 && Inputs.items.length === 1} // Disable the input if it's the first row and no other product is added
                        />
                      </td>
                    )}
                    <td>
                      <input
                        type="number"
                        className=" dark:bg-darklight focus:border-0"
                        disabled
                        value={row.amount}
                        readOnly
                      />
                    </td>
                    {index === 0 ? (
                      <td>
                        {/* <button onClick={addRow}>Add</button> */}
                        <button onClick={toggleslider}>Add</button>
                      </td>
                    ) : (
                      <td>
                        <button onClick={() => deleteRow(index)}>Delete</button>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div class="block w-full overflow-auto  dark:bg-darklight dark:text-white dark:border-darkborder scrolling-touch">
          <table class="w-full max-w-full   dark:bg-darklight dark:text-white dark:border-darkborder mb-4 bg-transparent table-hover bg-white">
            <tbody>
              <tr className="flex justify-end ">
                <td className="col-span-9"></td>

                <td colspan="5" class="text-end">
                  Total Item
                </td>
                <td class="text-end pr-4">
                  {/* <input
                      disabled
                      class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded text-end"
                      onClick={handelchange}
                      readonly=""
                      type="number"
                      value={Inputs.to}
                    /> */}
                </td>

                <tr>
                  <td colspan="5" class="text-end">
                    Total Qty
                  </td>
                  <td class="text-end pr-4">
                    <input
                      class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded text-end"
                      readonly=""
                      onChange={handelchange}
                      name="totalQuantity"
                      value={Inputs.totalQuantity}
                      type="number"
                    />
                  </td>
                </tr>
                <td colspan="5" class="text-end">
                  Total
                </td>
                <td class="text-end pr-4">
                  <input
                    disabled
                    class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded text-end"
                    value={Inputs.totalAmount}
                    onChange={handelchange}
                    readonly=""
                    type="number"
                  />
                </td>
              </tr>

              <tr>
                <td colspan="5" class="text-end">
                  Tax
                </td>
                <td class="text-end pr-4">
                  <input
                    class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded text-end"
                    value={Inputs.totalTaxable}
                    onChange={handelchange}
                    defaultValue={0}
                    name="totalTaxable"
                    type="text"
                  />
                </td>
              </tr>

              <tr>
                <td colspan="5" class="text-end">
                  Discount %
                </td>
                <td class="text-end pe-4">
                  <input
                    pattern="[0-9]*[.,]?[0-9]*"
                    name="discount"
                    defaultValue={"0"}
                    onChange={handelchange}
                    value={Inputs.discount}
                    class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded text-end"
                    type="text"
                  />
                </td>
              </tr>

              <tr>
                <td colspan="5" class="text-end pe-4">
                  <b>Total Amount</b>
                </td>
                <td class="text-end tdata-width pe-4">
                  <b>{Inputs.gtotalAmount}</b>
                </td>
              </tr>
              <tr>
                <td colspan="12" class="text-end ">
                  <input
                    type="radio"
                    name="TransactionType"
                    onChange={handleRadioChange}
                    value="unpaid"
                    id="unpaid"
                    checked={Inputs.transactionType === "unpaid"}
                  />{" "}
                  <label htmlFor="unpaid">Unpaid</label>{" "}
                  <input
                    type="radio"
                    name="TransactionType"
                    value="online"
                    onChange={handleRadioChange}
                    id="online"
                    checked={Inputs.transactionType === "online"}
                  />{" "}
                  <label htmlFor="online">Online</label>{" "}
                  <input
                    type="radio"
                    value="cash"
                    onChange={handleRadioChange}
                    name="TransactionType"
                    id="cash"
                    checked={Inputs.transactionType === "cash"}
                  />{" "}
                  <label htmlFor="cash">Cash</label>{" "}
                </td>
              </tr>
              {Inputs.transactionType !== "unpaid" && (
                <tr>
                  <td colspan="5" class="text-end pe-4">
                    <b>paid Amount</b>
                  </td>
                  <td class="text-end tdata-width pe-4">
                    <input
                      class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded "
                      type="number"
                      defaultValue={Inputs.gtotalAmount}
                      name="paidAmount"
                      onChange={handelchange}
                      value={Inputs.paidAmount}
                    />
                  </td>
                </tr>
              )}

              <tr>
                <td colspan="5" class="text-end pe-4">
                  <b>Due Amount</b>
                </td>
                <td class="text-end tdata-width pe-4">
                  <b>{Inputs.gtotalAmount - Inputs.paidAmount}</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex flex-wrap ">
          <div class="md:w-full pr-4 pl-4">
            <div class="input-block mb-3">
              <label class="pt-2 pb-2 mb-0 leading-normal">
                Other Information
              </label>
              <textarea class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"></textarea>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between col-3">
          {editdata ? (
            <button
              className="btn py-2.5 text-xl bg-purple border border-purple rounded-md text-white transition-all duration-300 hover:bg-purple/[0.85] hover:border-purple/[0.85]"
              onClick={updateHandle}
              type="submit"
            >
              Update Bill
            </button>
          ) : (
            <button
              className="btn py-2.5 text-xl bg-purple border border-purple rounded-md text-white transition-all duration-300 hover:bg-purple/[0.85] hover:border-purple/[0.85]"
              onClick={SumbmitHandle}
              type="submit"
            >
              Create Bill
            </button>
          )}
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

export default Biling;
