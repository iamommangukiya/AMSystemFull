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
import { validGst } from "./Regex";

const Biling = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const location = useLocation(); // Hook to access the current location object
  const mode = location.state?.mode || ""; // Get the mode from the state
  const editdata = location.state?.data;
  // console.log(editdata);
  let bookName = "";
  switch (mode) {
    case "salse":
      bookName = "SalesBook";
      break;
    case "purchase":
      bookName = "PurchaseBook";
      break;
    case "asimat":
      bookName = "AsimatBill";
      break;
    case "deliveryChallan":
      bookName = "deliveryChallan";
      break;
    case "quotation":
      bookName = "quotation";
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
    bStateName: "", // Assuming bStateName will store the selected state name
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
    items: [],
  });

  let billname = "";
  switch (mode) {
    case "salse":
      billname = Inputs.isGstBill ? "GST salse Billing" : "salse Billing";
      break;
    case "purchase":
      billname = Inputs.isGstBill ? "GST purchase Billing" : "purchase Billing";
      break;
    case "asimat":
      billname = "AsimatBill";
      break;
    case "deliveryChallan":
      billname = "Delivery Challan";
      break;
    case "quotation":
      billname = Inputs.isGstBill
        ? "GST quotation Billing"
        : "quotation Billing";
      break;
    default:
      bookName = "";
      break;
  }
  const [isChecked, setIsChecked] = useState(false);
  const [inventoryItems, setInventoryItems] = useState([]);
  const dispatch = useDispatch();
  // slider item
  useEffect(() => {
    if (editdata) {
      console.log(editdata);
      var isGstBills = editdata.isGstBill !== "false";
      dispatch(getItemsOfBill(editdata.id));
      setInputs({ ...editdata });
      setInputs((prevInputs) => ({
        ...prevInputs,
        isGstBill: isGstBills,
        pgstNo: editdata.gstNo,
        paidAmount: editdata.payAmount,
        bStateName: editdata.bStateCode,
      }));
    } else {
      setInputs((prevInputs) => ({
        ...prevInputs,
        items: [],
      }));
    }
  }, [editdata]);

  useEffect(() => {
    if (mode === "purchase") {
      setInputs((prevstate) => ({ ...prevstate, flag: "P" }));
    } else if (mode == "salse") {
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
  const stateData = {
    AN: "Andaman and Nicobar Islands",
    AP: "Andhra Pradesh",
    AR: "Arunachal Pradesh",
    AS: "Assam",
    BR: "Bihar",
    CG: "Chandigarh",
    CH: "Chhattisgarh",
    DN: "Dadra and Nagar Haveli",
    DD: "Daman and Diu",
    DL: "Delhi",
    GA: "Goa",
    GJ: "Gujarat",
    HR: "Haryana",
    HP: "Himachal Pradesh",
    JK: "Jammu and Kashmir",
    JH: "Jharkhand",
    KA: "Karnataka",
    KL: "Kerala",
    LA: "Ladakh",
    LD: "Lakshadweep",
    MP: "Madhya Pradesh",
    MH: "Maharashtra",
    MN: "Manipur",
    ML: "Meghalaya",
    MZ: "Mizoram",
    NL: "Nagaland",
    OR: "Odisha",
    PY: "Puducherry",
    PB: "Punjab",
    RJ: "Rajasthan",
    SK: "Sikkim",
    TN: "Tamil Nadu",
    TS: "Telangana",
    TR: "Tripura",
    UP: "Uttar Pradesh",
    UK: "Uttarakhand",
    WB: "West Bengal",
  };

  const HandleToggle = () => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      isGstBill: !Inputs.isGstBill,
    }));
  };

  const flag = useSelector((state) => state.BillingReducer.result.flag || {});

  let flagu = useSelector(
    (state) => state.BillingReducer.updateBilllog?.flag || {}
  );

  const validation = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Perform validation
    const errors = {};
    if (!Inputs.invoiceNo.trim()) {
      errors.invoiceNo = "Invoice number is required";
    }
    if (!Inputs.bPartyName.trim()) {
      errors.bPartyName = "Party name is required";
    }
    if (
      Inputs.items.length === 0 ||
      Inputs.items.some((item) => !item.name || !item.qty || item.qty <= 0)
    ) {
      toast.error("At least one item is required");
      errors.item = "kshdg";
    }
    // Additional validations as needed...
    if (Inputs.isGstBill) {
      const isGst = validGst.test(Inputs.pgstNo);
      if (!isGst) {
        errors.gst = "Please Enter valid GSTIN";
        // Prevent submission if GST is invalid
      }
    }
    // If there are errors, set them and prevent form submission
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // Clear previous errors if any
    setErrors({});

    // If no errors, proceed with form submission

    SumbmitHandle();
  };
  if (flag === true || flagu == true) {
    toast.success("Sucessfull", "sucess");
    dispatch(billingaction.CleanInsertBill());
    dispatch(billingaction.clearBillitem());
    dispatch(billingaction.clerarupbill());
    setTimeout(() => {
      // navigate("/dashboard/PurchaseBill");
      window.history.back();
    }, 2000);
  }

  const handelchange = (e, index) => {
    const { name, value } = e.target;

    if (index >= 0) {
      const updatedItems = Inputs.items
        .map((item, i) => {
          if (i === index) {
            const qty = name === "qty" ? parseFloat(value) || 0 : item.qty;
            const salePrice =
              name === "salePrice" ? parseFloat(value) || 0 : item.salePrice;
            const GST = name === "GST" ? parseFloat(value) || 0 : item.GST;

            // Remove item if quantity becomes 0
            if (qty <= 0) {
              return null; // Signal to remove this item
            }

            // Calculate the amount based on whether isGstBill is true or false
            const amount = Inputs.isGstBill
              ? (qty * salePrice + qty * salePrice * (GST / 100)).toFixed(2)
              : (qty * salePrice).toFixed(2);

            return {
              ...item,
              [name]: value,
              amount,
            };
          } else {
            return item;
          }
        })
        .filter(Boolean); // Filter out null values (removed items)

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
  useEffect(() => {
    // console.log(Inputs);
  }, [Inputs]);
  const stateOptions = Object.entries(stateData).map(([code, name]) => ({
    code,
    name,
  }));
  const handleStateChange = (e) => {
    const selectedStateName = e.target.value;
    setInputs((prevInputs) => ({
      ...prevInputs,
      bStateName: selectedStateName,
    }));
  };

  return (
    <>
      <Slidover
        isOpen={isOpen}
        selectItem={selectItem}
        toggleSlideover={toggleslider}
        inventoryItems={inventoryItems}
      ></Slidover>
      <div className=" flex-col min-h-screen justify-betweens flex items-center  dark:bg-darklight dark:border-darkborder">
        {/* <div className=" flex-col flex items-center py-4 bg-white shadow-md rounded   justify-center  "> */}
        <h2 className="col-span-full flex  justify-between text-2xl font-bold">
          <p>{billname}</p>
          {mode !== "deliveryChallan" && (
            <div className="switch ps-2 justify-end">
              <input
                type="checkbox"
                className="rounded-sm p-3"
                checked={Inputs.isGstBill}
                onChange={HandleToggle}
              />
            </div>
          )}
        </h2>
        <form
          onSubmit={validation}
          className="grid grid-cols-1    dark:bg-darklight dark:text-white dark:border-dark gap-3 md:grid-cols-2 py-5 lg:grid-cols-4 xl:grid-cols-4 pt-6  mb-4 "
        >
          {/* party start */}
          {/* // party name */}

          <div className="mb-4">
            <label className="block text-black text-sm mb-2">
              PartyName: *
            </label>
            <input
              type="text"
              required
              className="form-input border focus:border-0  border-gray-400 w-full rounded-md h-10 "
              onChange={handelchange}
              name="bPartyName"
              value={Inputs.bPartyName}
            />
            {errors.bPartyName && (
              <p className="text-red-600" htmlFor="">
                {errors.bPartyName}
              </p>
            )}
          </div>
          {/* // Party adress */}
          <div className="mb-4">
            <label className="block text-black text-sm mb-2">
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
          {/* // state name */}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Bill State Name:
            </label>
            <select
              className="form-input border focus:border-0 border-gray-400 w-full rounded-md h-10"
              onChange={handleStateChange}
              name="bStateName"
              value={Inputs.bStateName}
            >
              <option value="">Select State</option>
              {stateOptions.map((state) => (
                <option key={state.code} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
          {/* // GstIn Party*/}
          {Inputs.isGstBill == true && (
            <div className="mb-4">
              <label className="block text-black text-sm mb-2">
                Party GSTIN:
              </label>
              <input
                required
                type="text"
                className="form-input border focus:border-0 border-gray-400 w-full rounded-md h-10"
                onChange={handelchange}
                name="pgstNo"
                value={Inputs.pgstNo}
              />
              {errors.gst && (
                <>
                  <p className="text-red-600">{errors.gst}</p>
                </>
              )}
            </div>
          )}

          {/* party end */}

          {/* purchase details start */}

          {/* // bill no */}
          <div className="mb-4">
            <label className="block text-black text-sm mb-2">
              Invoice Number*
            </label>
            <input
              type="number"
              required
              className="form-input border focus:border-0 border-gray-400 w-full rounded-md h-10"
              onChange={handelchange}
              name="invoiceNo"
              value={Inputs.invoiceNo}
            />
            {errors.invoiceNo && (
              <p className="text-red-600" htmlFor="">
                {errors.invoiceNo}
              </p>
            )}
          </div>
          {/* // date */}
          <div className="mb-4">
            <label className="block text-black text-sm mb-2">
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
            <label className="block text-black text-sm mb-2">Due Date</label>
            <input
              type="date"
              className="form-input border focus:border-0 border-gray-400 w-full rounded-md h-10"
              onChange={handelchange}
              name="dueDate"
              value={Inputs.dueDate}
            />
          </div>

          {/* Transpose Date */}
          <div className="mb-4">
            <label className="block text-black text-sm mb-2">
              TransportDate:
            </label>
            <input
              type="date"
              required
              className="form-input border focus:border-0 border-gray-400 w-full rounded-md h-10"
              onChange={handelchange}
              name="transportDate"
              value={Inputs.transportDate}
            />
          </div>

          <div className="mb-4">
            <label className="block text-black text-sm mb-2">
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

        <div className="block w-full overflow-x-auto">
          <table className="w-full mb-4 bg-transparent table-hover dark:bg-darklight dark:text-white dark:border-darkborder bg-white">
            <thead>
              <tr>
                <th>sr No</th>
                <th>Item</th>
                <th>Description</th>
                <th>Unit Cost</th>
                <th>Qty</th>
                {Inputs.isGstBill == true && <th>GST%</th>}
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="tbodyone">
              {/* {console.log(Inputs.items)} */}
              {Inputs.items &&
                Inputs.items.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <input
                        type="text"
                        readOnly
                        name="name"
                        className="dark:bg-darklight focus:border-0 w-full md:w-auto lg:w-full rounded-md"
                        value={row.name}
                        disabled
                        onChange={(e) => handelchange(e, index)}
                        // Disable the input if it's the first row and no other product is added
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="description"
                        className="dark:bg-darklight focus:border-0 w-full md:w-auto lg:w-full rounded-md"
                        value={row.description}
                        onChange={(e) => handelchange(e, index)}
                        // Disable the input if it's the first row and no other product is added
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        readOnly
                        className="dark:bg-darklight focus:border-0 w-full md:w-auto lg:w-full rounded-md"
                        inputMode="decimal"
                        name="salePrice"
                        value={row.salePrice}
                        onChange={(e) => handelchange(e, index)}
                        // Disable the input if it's the first row and no other product is added
                      />
                    </td>
                    <td>
                      <input
                        className="dark:bg-darklight focus:border-0 w-full md:w-auto lg:w-full rounded-md"
                        type="number"
                        name="qty"
                        defaultValue={1}
                        value={row.qty}
                        onChange={(e) => handelchange(e, index)}
                        // Disable the input if it's the first row and no other product is added
                      />
                    </td>
                    {Inputs.isGstBill == true && (
                      <td>
                        <input
                          type="number"
                          className="dark:bg-darklight focus:border-0 w-full md:w-auto lg:w-full rounded-md"
                          name="GST"
                          readOnly
                          value={row.GST}
                          onChange={(e) => handelchange(e, index)}
                          // Disable the input if it's the first row and no other product is added
                        />
                      </td>
                    )}
                    <td>
                      <input
                        type="number"
                        className="dark:bg-darklight focus:border-0 w-full md:w-auto lg:w-full rounded-md"
                        disabled
                        value={row.amount}
                        readOnly
                      />
                    </td>

                    <td>
                      <button onClick={() => deleteRow(index)}>Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="block w-full overflow-auto  dark:bg-darklight dark:text-white dark:border-darkborder scrolling-touch">
          <table className="w-full max-w-full   dark:bg-darklight dark:text-white dark:border-darkborder mb-4 bg-transparent table-hover bg-white">
            <tbody>
              <tr className="flex justify-end ">
                <td>
                  <button
                    className="text-xl text-center px-3 py-2 rounded text- bg-slate-200 w-80"
                    onClick={toggleslider}
                  >
                    Add
                  </button>
                </td>

                <td colspan="5" className="text-end">
                  Total Item
                </td>

                <tr>
                  <td colspan="5" className="text-end">
                    Total Qty
                  </td>
                  <td className="text-end pr-4">
                    <input
                      className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded text-end"
                      readonly=""
                      onChange={handelchange}
                      name="totalQuantity"
                      value={Inputs.totalQuantity}
                      type="number"
                    />
                  </td>
                </tr>
                <td colspan="6" className="text-center">
                  Total
                </td>
                <td className="text-end pr-4">
                  <input
                    disabled
                    className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded text-end"
                    value={Inputs.totalAmount}
                    onChange={handelchange}
                    readonly=""
                    type="number"
                  />
                </td>
              </tr>

              <tr>
                <td colspan="5" className="text-end">
                  Tax
                </td>
                <td className="text-end pr-4">
                  <input
                    className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded text-end"
                    value={Inputs.totalTaxable}
                    onChange={handelchange}
                    defaultValue={0}
                    name="totalTaxable"
                    type="text"
                  />
                </td>
              </tr>

              <tr>
                <td colspan="5" className="text-end">
                  Discount %
                </td>
                <td className="text-end pe-4">
                  <input
                    pattern="[0-9]*[.,]?[0-9]*"
                    name="discount"
                    defaultValue={"0"}
                    onChange={handelchange}
                    value={Inputs.discount}
                    className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded text-end"
                    type="text"
                  />
                </td>
              </tr>

              <tr>
                <td colspan="5" className="text-end pe-4">
                  <b>Total Amount</b>
                </td>
                <td className="text-end tdata-width pe-4">
                  <b>{Inputs.gtotalAmount}</b>
                </td>
              </tr>
              <tr>
                <td colspan="12" className="text-end ">
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
                  <td colspan="5" className="text-end pe-4">
                    <b>paid Amount</b>
                  </td>
                  <td className="text-end tdata-width pe-4">
                    <input
                      className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded "
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
                <td colspan="5" className="text-end pe-4">
                  <b>Due Amount</b>
                </td>
                <td className="text-end tdata-width pe-4">
                  <b>{Inputs.gtotalAmount - Inputs.paidAmount}</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between col-3 pb-3">
          {editdata ? (
            <button
              className="btn py-2.5 bg-[#225777] border border-[#225777] rounded-md text-white transition-all duration-300 hover:bg-[#173054] hover:border-[#173054]"
              onClick={updateHandle}
              type="submit"
            >
              Update Bill
            </button>
          ) : (
            <button
              className="btn py-2.5 bg-[#225777] border border-[#225777] rounded-md text-white transition-all duration-300 hover:bg-[#173054] hover:border-[#173054]"
              onClick={validation}
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
