import React, { useEffect, useState } from "react";
import { addbill, billingaction } from "../reducer/billing_reducer";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const Biling = ({ mode }) => {
  const [Inputs, setInputs] = useState({
    invoiceNo: "",
    invoiceDate: "",
    dueDate: "",
    bPartyName: "",
    bPartyAdress: "",
    bStateCode: "",
    gstNo: "",
    totalQuantity: "",
    gtotalAmount: "",
    discount: "",
    totalTaxable: "",
    totalSgst: "",
    totalCgst: "",
    totalIGst: "",
    tcs: "",
    totalAmount: "",
    flag: "",
    transportDate: "",
    bookName: "",
    payAmount: "",
    panding: "",
    kasar: "",
    deliveryAdress: "",
    items: [
      {
        id: 1,
        item: "",
        description: "",
        unitCost: "",
        qty: "",
        amount: "",
      },
    ],
  });
  const dispatch = useDispatch();
  const flag = useSelector((state) => state.BillingReducer.result.flag || {});
  if (flag === true) {
    toast.success("Sucessfull", "sucess");
    dispatch(billingaction.CleanInsertBill());
  }
  useEffect(() => {
    if (mode === "purchase") {
      setInputs((prevstate) => ({ ...prevstate, flag: "P" }));
    } else if (mode == "sale") {
      setInputs((prevstate) => ({ ...prevstate, flag: "s" }));
    }
  }, []);
  const handelchange = (e, index) => {
    const { name, value } = e.target;

    if (index >= 0) {
      const updatedItems = Inputs.items.map((item, i) => {
        if (i === index) {
          const qty = name === "qty" ? parseFloat(value) || 0 : item.qty;
          const unitCost =
            name === "unitCost" ? parseFloat(value) || 0 : item.unitCost;

          return {
            ...item,
            [name]: value,
            amount: (qty * unitCost).toFixed(2), // Calculate amount based on qty and unitCost
          };
        } else {
          return item;
        }
      });

      const totalAmount = updatedItems.reduce(
        (total, item) => total + parseFloat(item.amount) || 0,
        0
      );

      const totalQuantity = updatedItems.reduce(
        (totalQty, item) => totalQty + parseFloat(item.qty) || 0,
        0
      );

      setInputs((prevInputs) => ({
        ...prevInputs,
        items: updatedItems,
        totalAmount: totalAmount.toFixed(2),
        totalQuantity: totalQuantity.toFixed(2),
      }));
    } else {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
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

  const addRow = () => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      items: [
        ...prevInputs.items,
        {
          id: prevInputs.items.length + 1,
          item: "",
          description: "",
          unitCost: "",
          qty: "",
          amount: "",
        },
      ],
    }));
  };
  const deleteRow = (id) => {
    const updatedItems = Inputs.items.filter((item) => item.id !== id);
    setInputs({ ...Inputs, items: updatedItems });
  };
  const SumbmitHandle = () => {
    dispatch(addbill(Inputs));
  };
  return (
    <>
      <div className=" flex-col min-h-screen justify-center flex items-center  bg-gray-100 ">
        {/* <div className=" flex-col flex items-center py-4 bg-white shadow-md rounded   justify-center  "> */}
        <h2 className="col-span-full  justify-center text-center mb-4 text-primary text-2xl font-bold">
          {mode == "sale" && "Sale Biling"}
          {mode == "purchase" && "purchase Biling"}
        </h2>
        <form className="grid grid-cols-1  gap-3 md:grid-cols-2 py-5 lg:grid-cols-4 xl:grid-cols-4 pt-6  mb-4 ">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Bill PartyName:
            </label>
            <input
              type="text"
              className="form-input border border-primary w-full rounded-md h-10"
              onChange={handelchange}
              name="bPartyName"
              value={Inputs.bPartyName}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Invoice Number
            </label>
            <input
              type="text"
              className="form-input border border-primary w-full rounded-md h-10"
              onChange={handelchange}
              name="invoiceNo"
              value={Inputs.invoiceNo}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Invoice Date
            </label>
            <input
              type="date"
              className="form-input border border-primary w-full rounded-md h-10"
              onChange={handelchange}
              name="invoiceDate"
              value={Inputs.invoiceDate}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Due Date
            </label>
            <input
              type="date"
              className="form-input border border-primary w-full rounded-md h-10"
              onChange={handelchange}
              name="dueDate"
              value={Inputs.dueDate}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Bill PartyAdress:
            </label>
            <textarea
              type="text"
              className="form-input border border-primary w-full rounded-md h-10"
              onChange={handelchange}
              name="bPartyAdress"
              value={Inputs.bPartyAdress}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Bill StateCode:
            </label>
            <input
              type="number"
              className="form-input border border-primary w-full rounded-md h-10"
              onChange={handelchange}
              name="bStateCode"
              value={Inputs.bStateCode}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Gst:
            </label>
            <input
              type="text"
              className="form-input border border-primary w-full rounded-md h-10"
              onChange={handelchange}
              name="gstNo"
              value={Inputs.gstNo}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Total SGST:
            </label>
            <input
              type="number"
              className="form-input border border-primary w-full rounded-md h-10"
              onChange={handelchange}
              name="totalSgst"
              value={Inputs.totalSgst}
            />
          </div>
          <div className="mb-4">
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
          </div>
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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tcs:
            </label>
            <input
              type="text"
              className="form-input border border-primary w-full rounded-md h-10"
              onChange={handelchange}
              name="tcs"
              value={Inputs.tcs}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              TransportDate:
            </label>
            <input
              type="date"
              className="form-input border border-primary w-full rounded-md h-10"
              onChange={handelchange}
              name="transportDate"
              value={Inputs.transportDate}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Book Name:
            </label>
            <input
              type="text"
              className="form-input border border-primary w-full rounded-md h-10"
              onChange={handelchange}
              name="bookName"
              value={Inputs.bookName}
            />
          </div>
          <div className="mb-4">
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
          </div>
          <div className="mb-4">
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
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              deliveryAdress:
            </label>
            <input
              type="text"
              className="form-input border border-primary w-full rounded-md h-10"
              onChange={handelchange}
              name="deliveryAdress"
              value={Inputs.deliveryAdress}
            />
          </div>
        </form>

        <div class="block w-full overflow-auto scrolling-touch">
          <table
            class="w-full max-w-full mb-4 bg-transparent table-hover bg-white"
            id="addTable"
          >
            <thead>
              <tr>
                <th>#</th>
                <th class="sm:w-1/5 pr-4 pl-4">Item</th>
                <th class="md:w-1/2 pr-4 pl-4">Description</th>
                <th>Unit Cost</th>
                <th>Qty</th>
                <th>Amount</th>
                <th> </th>
              </tr>
            </thead>
            <tbody className="tbodyone">
              {Inputs.items.map((row, index) => (
                <tr key={index}>
                  <td>{row.id}</td>
                  <td>
                    <input
                      type="text"
                      name="item"
                      value={row.item}
                      onChange={(e) => handelchange(e, index)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="description"
                      value={row.description}
                      onChange={(e) => handelchange(e, index)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      inputMode="decimal"
                      name="unitCost"
                      value={row.unitCost}
                      onChange={(e) => handelchange(e, index)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="qty"
                      value={row.qty}
                      onChange={(e) => handelchange(e, index)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      disabled
                      value={row.amount}
                      // value={row.qty * row.unitCost}
                      readOnly
                    />
                  </td>
                  {index === 0 ? (
                    <td>
                      <button onClick={addRow}>Add</button>
                    </td>
                  ) : (
                    <td>
                      <button onClick={() => deleteRow(row.id)}>Delete</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div class="block w-full overflow-auto scrolling-touch">
          <table class="w-full max-w-full mb-4 bg-transparent table-hover bg-white">
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
                    onChange={handelchange}
                    value={Inputs.discount}
                    class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded text-end"
                    type="text"
                  />
                </td>
              </tr>
              <tr>
                <td colspan="5" class="text-end pe-4">
                  <b>Grand Total</b>
                </td>
                <td class="text-end tdata-width pe-4">
                  <b>{Inputs.gtotalAmount}</b>
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
          <button
            className="btn py-2.5 text-xl bg-purple border border-purple rounded-md text-white transition-all duration-300 hover:bg-purple/[0.85] hover:border-purple/[0.85]"
            onClick={SumbmitHandle}
            type="submit"
          >
            Submit
          </button>
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
