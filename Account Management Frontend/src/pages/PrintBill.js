import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  billingaction,
  getItemsOfBill,
  getbilldatabyId,
} from "../reducer/billing_reducer";
import { items_get } from "../reducer/Item_reducer";
import { fetchDetailsComapny } from "../reducer/Company_reducer";

const PrintBill = () => {
  const location = useLocation();
  const { state } = location;
  const dispatch = useDispatch();
  const [Inputs, setInputs] = useState({});

  const data = useSelector((state) => state.BillingReducer.result.data);
  useEffect(() => {
    if (data) {
      setInputs((prevInputs) => ({ ...prevInputs, ...data }));
    }
  }, [data]);

  useEffect(() => {
    dispatch(billingaction.CleanInsertBill());
    dispatch(getbilldatabyId(state));
    dispatch(getItemsOfBill(state));

    dispatch(items_get());
    dispatch(fetchDetailsComapny());
  }, []);
  const BillingItem = useSelector(
    (state) => state.BillingReducer.billItems?.data
  );
  console.log(BillingItem, "billingitm");
  const ItemData = useSelector((state) => state.ItemReducer.result?.data);
  console.log(ItemData, "itemdata");
  const cmpdata = useSelector((state) => state.CompanyReducer.result?.data);
  var Company;
  if (cmpdata) {
    Company = cmpdata[0];
  }
  useEffect(() => {
    if (BillingItem) {
      const result = findItemDetails(BillingItem, ItemData);
      console.log(result, "result");
      // Update the state with the result
      setInputs((prevInputs) => ({
        ...prevInputs,
        items: result,
      }));
    }
  }, [BillingItem, ItemData]);
  console.log(Inputs);

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
  const convertToWords = (num) => {
    const ones = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    if (num === 0) return "Zero";
    if (num < 20) return ones[num];
    if (num < 100)
      return (
        tens[Math.floor(num / 10)] +
        (num % 10 !== 0 ? " " + ones[num % 10] : "")
      );
    if (num < 1000)
      return (
        ones[Math.floor(num / 100)] +
        " Hundred" +
        (num % 100 !== 0 ? " and " + convertToWords(num % 100) : "")
      );
    if (num < 1000000)
      return (
        convertToWords(Math.floor(num / 1000)) +
        " Thousand" +
        (num % 1000 !== 0 ? " " + convertToWords(num % 1000) : "")
      );
    if (num < 1000000000)
      return (
        convertToWords(Math.floor(num / 1000000)) +
        " Million" +
        (num % 1000000 !== 0 ? " " + convertToWords(num % 1000000) : "")
      );
    return "Number too large to convert to words";
  };
  return (
    <div className="flex h-full w-full justify-center">
      <div className="h-3/4 w-3/4 ">
        <section class="bill ">
          <div class="border-t-4 border border-red-700"></div>
          <div class="container">
            <div class="grid grid-cols-2 py-6">
              <div class="space-y-2">
                <h1 class="font-bold">{Company && Company["companyName"]}</h1>
                <i class="text-sm">
                  Phone: {Company && Company["phoneNumber"]}
                </i>

                <p class="text-sm font-bold">
                  GSTIN:{Company && Company[" "]} | State of supply Code:
                </p>
                <p class="font-bold">{Inputs && Inputs["deliveryAdress"]}</p>
              </div>
              <div class="text-end space-y-2">
                <h1 class="font-bold">
                  Invoice No.{Inputs && Inputs["invoiceNo"]}
                </h1>
                <p>
                  Due Date:{Inputs && Inputs["dueDate"]} | Invoice Date:
                  {Inputs && Inputs["invoiceDate"]}
                </p>
              </div>
            </div>
            {/* <!-- end grid --> */}
          </div>
          {/* <!-- end container --> */}
        </section>
        {/* <!-- end home section --> */}
        {/*  */}
        <section>
          <div class="container">
            <div class="grid grid-cols-2 py-6 border border-red-700 rounded-xl px-6 bg-red-50">
              <div class="space-y-2">
                <p class="text-sm">Bill and Ship To</p>
                <h1 class="font-bold">{Inputs && Inputs["bPartyName"]}</h1>
                <p class="text-sm">
                  {Inputs &&
                    Inputs["isGstBill"] === true &&
                    "GSTIN: " + Inputs["gstNo"] + " |"}
                  State of supply:
                  {Inputs && Inputs["deliveryAdress"]}
                </p>
              </div>
              <div class="text-end pt-10 space-y-2">
                <p class="text-sm">Total amount</p>
                <h1 class="text-3xl font-bold">
                  {Inputs && Inputs["gtotalAmount"]}
                </h1>
                <p class="text-sm">
                  {convertToWords(Inputs && Inputs["gtotalAmount"])}
                </p>
                <p class="text-sm text-red-700 font-bold">
                  Invoice:{" "}
                  {Inputs && Inputs["dueAmount"] === 0
                    ? "Paid"
                    : Inputs["dueAmount"] < Inputs["gtotalAmount"]
                    ? "Partial"
                    : "Unpaid"}
                </p>
              </div>
            </div>
            {/* <!-- end grid --> */}
          </div>
          {/* <!-- end container --> */}
        </section>

        <section class="my-6">
          <div class="container">
            <div class="border border-blue-700 rounded-xl px-3 py-5">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="py-2">#</th>
                    <th className="py-2">Item Details</th>
                    <th className="py-2">Price</th>
                    <th className="py-2">Qty</th>
                    <th className="py-2">Total Rate</th>
                    {Inputs && Inputs["isGstBill"] == true && (
                      <th className="py-2">Total Tax</th>
                    )}{" "}
                    <th className="py-2">Item Total</th>
                  </tr>
                </thead>
                <tbody>
                  {Inputs.items &&
                    Inputs.items.map((item, index) => (
                      <tr
                        key={item.id}
                        className="border-b border-blue-700 text-center"
                      >
                        <td className="py-2">{index + 1}</td>
                        <td className="py-2">{item.name || ""}</td>
                        <td className="py-2">
                          {item.salePrice ? `${item.salePrice}` : ""}
                        </td>
                        <td className="py-2">{item.qty || ""}</td>
                        <td className="py-2">
                          {item.salePrice && item.qty
                            ? item.salePrice * item.qty
                            : ""}
                        </td>
                        {Inputs && Inputs["isGstBill"] == true && (
                          <td className="py-2">
                            {item.GST && item.salePrice
                              ? `${item.GST}(${
                                  (item.GST / item.salePrice) * 100
                                }%)`
                              : ""}
                          </td>
                        )}

                        <td className="py-2 bg-blue-50">{item.amount || ""}</td>
                      </tr>
                    ))}
                  <tr className="text-center font-bold border-b border-blue-700 bg-blue-50">
                    <td className="py-2">Sub-total Amount</td>
                    <td></td>
                    <td></td>
                    <td className="py-2">{Inputs.totalQuantity || ""}</td>
                    <td className="py-2">{Inputs.totalAmount || ""}</td>
                    {Inputs && Inputs["isGstBill"] == true && (
                      <td className="py-2">
                        {(Inputs.totalSgst || 0) +
                          (Inputs.totalCgst || 0) +
                          (Inputs.totalIGst || 0)}
                      </td>
                    )}

                    <td className="py-2">{Inputs.gtotalAmount || ""}</td>
                  </tr>
                </tbody>
              </table>
              {Inputs && Inputs["isGstBill"] == true && (
                <table className="w-[50%] mt-12">
                  <thead>
                    <tr className="border-b-2 border-black">
                      <th className="py-2">Tax Slab</th>
                      <th className="py-2">Taxable Amount</th>
                      <th className="py-2">Tax</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Inputs.items &&
                      Inputs.items.map((item, index) => (
                        <React.Fragment key={item.id}>
                          {item.GST && (
                            <>
                              <tr className="border-b border-dashed border-blue-700 text-center">
                                <td className="py-2">
                                  CGST - {item.GST / 2 || 0}%
                                </td>
                                <td className="py-2">
                                  {item.salePrice * item.qty || 0}
                                </td>
                                <td className="py-2">
                                  {((item.GST / 2) *
                                    (item.salePrice * item.qty)) /
                                    100 || 0}
                                </td>
                              </tr>
                              <tr className="border-b border-dashed border-blue-700 text-center">
                                <td className="py-2">
                                  SGST - {item.GST / 2 || 0}%
                                </td>
                                <td className="py-2">
                                  {item.salePrice * item.qty || 0}
                                </td>
                                <td className="py-2">
                                  {((item.GST / 2) *
                                    (item.salePrice * item.qty)) /
                                    100 || 0}
                                </td>
                              </tr>
                            </>
                          )}
                        </React.Fragment>
                      ))}
                  </tbody>
                </table>
              )}

              <div class="text-end pt-10 space-y-2">
                <p>Total amount</p>
                <h1 class="text-3xl font-bold">
                  {Inputs && Inputs["gtotalAmount"]}
                </h1>
                <p class="text-sm">
                  {convertToWords(Inputs && Inputs["gtotalAmount"])}
                </p>
                <p class="text-sm text-red-700 font-bold">
                  Invoice:{" "}
                  {Inputs && Inputs["dueAmount"] === 0
                    ? "Paid"
                    : Inputs["dueAmount"] < Inputs["gtotalAmount"]
                    ? "Partial"
                    : "Unpaid"}
                </p>
                <p class="text-sm">Is reverce charge applicable?No</p>
              </div>
            </div>
          </div>
          {/* <!-- end container --> */}
        </section>
        <section>
          <div class="container">
            <p class="text-center">- THIS IS DIGITALLY CREATED INVOICE -</p>
            <p class="text-end py-5">AUTHORISED SIGNATURE</p>
            <p class="py-5">Thank you for the business.</p>
          </div>
        </section>
        <div class="border-b-8 border-red-700"></div>
      </div>
    </div>
  );
};

export default PrintBill;
