import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getbalancesheet } from "../reducer/billing_reducer";
import { usePDF, Margin } from "react-to-pdf";

const Balancesheet = ({ mode }) => {
  const dispatch = useDispatch();
  // get the data from redux store
  const balancesheetData = useSelector(
    (state) => state.BillingReducer.balancesheet?.data
  );
  useEffect(() => {
    dispatch(getbalancesheet());
  }, []);
  useEffect(() => {
    console.log(balancesheetData);
  }, [balancesheetData]);
  const { toPDF, targetRef } = usePDF({
    filename: "BalanceSheet.pdf",
    page: {
      size: "auto",
      margin: Margin.MEDIUM,
    },
  });
  return (
    <>
      <section className="w-full flex flex-col justify-center items-center">
        <section className="flex w-full justify-end mr-64 mb-4 ">
          <button
            className="bg-[#225777] text-white rounded-lg py-2 px-5 border border-[#225777] transition-all duration-300 hover:bg-[#173054] hover:border-[#173054]"
            onClick={() => toPDF()}
          >
            GET PDF
          </button>
        </section>
        <section
          ref={targetRef}
          class="container py-10 w-4/5 bg-white p-5 rounded-md justify-center items-center"
        >
          <p className=" font-bold color-black text-2xl pb-5">BalanceSheet</p>
          <table class="w-full border-collapse">
            <tr class="text-center">
              <td class="border border-black ps-2 font-bold">Particulars</td>
              <td class="border border-black ps-2 font-bold">Amount (in ₹)</td>
              <td class="border border-black ps-2 font-bold">Amount (in ₹)</td>
            </tr>
            {/* <tr>
              <td class="border border-black ps-2 font-bold">
                Equity and Liabilities
              </td>
              <td class="border border-black ps-2"></td>
              <td class="border border-black ps-2"></td>
            </tr>
            <tr>
              <td class="border border-black ps-2">Shareholders fund:</td>
              <td class="border border-black ps-2"></td>
              <td class="border border-black ps-2"></td>
            </tr>
            <tr>
              <td class="border border-black ps-2">Common Stock</td>
              <td class="border border-black ps-2"></td>
              <td class="border border-black ps-2"></td>
            </tr>
            <tr>
              <td class="border border-black ps-2">Retained Earnings</td>
              <td class="border border-black ps-2"></td>
              <td class="border border-black ps-2"></td>
            </tr> */}
            {/* <tr>
              <td class="border border-black p-3"></td>
              <td class="border border-black p-3"></td>
              <td class="border border-black p-3"></td>
            </tr> */}
            <tr>
              <td class="border border-black ps-2">Liabilities:</td>
              <td class="border border-black ps-2"></td>
              <td class="border border-black ps-2"></td>
            </tr>
            <tr>
              <td class="border border-black ps-2 font-bold">
                Current Liabilities
              </td>
              <td class="border border-black ps-2"></td>
              <td class="border border-black ps-2"></td>
            </tr>
            <tr>
              <td class="border border-black ps-2">Accounts Payable</td>
              <td class="border border-black ps-2">
                {formatAsRupees(
                  balancesheetData &&
                    balancesheetData.liabilities.accountsPayable
                )}
              </td>
              <td class="border border-black ps-2"></td>
            </tr>
            <tr>
              <td class="border border-black ps-2">Short Term Loan</td>
              <td class="border border-black ps-2"></td>
              <td class="border border-black ps-2"></td>
            </tr>
            <tr>
              <td class="border border-black ps-2">Accured Liabilities</td>
              <td class="border border-black ps-2"></td>
              <td class="border border-black ps-2"></td>
            </tr>
            {/* <tr>
                <td class="border border-black p-3"></td>
                <td class="border border-black p-3"></td>
                <td class="border border-black p-3"></td>
                </tr> */}
            {/* <tr>
                <td class="border border-black ps-2 font-bold">
                    Long Term Liabilities
                </td>
                <td class="border border-black ps-2"></td>
                <td class="border border-black ps-2"></td>
                </tr>
                <tr>
                <td class="border border-black ps-2">Long Term Loans</td>
                <td class="border border-black ps-2">60,000</td>
                <td class="border border-black ps-2"></td>
                </tr>
                <tr>
                <td class="border border-black ps-2">Deffered Tax Liabilities</td>
                <td class="border border-black ps-2">12,000</td>
                <td class="border border-black ps-2">72,000</td>
                </tr> */}
            <tr>
              <td class="border border-black ps-2 font-bold">Total</td>
              <td class="border border-black ps-2"></td>
              <td class="border border-black ps-2 font-bold">
                {" "}
                {formatAsRupees(
                  balancesheetData &&
                    balancesheetData.liabilities.accountsPayable
                )}
              </td>
            </tr>
            <tr>
              <td class="border border-black p-3"></td>
              <td class="border border-black p-3"></td>
              <td class="border border-black p-3"></td>
            </tr>
            <tr>
              <td class="border border-black ps-2 font-bold">Assets:</td>
              <td class="border border-black ps-2"></td>
              <td class="border border-black ps-2"></td>
            </tr>
            <tr>
              <td class="border border-black ps-2 font-bold">Current Assets</td>
              <td class="border border-black ps-2"></td>
              <td class="border border-black ps-2"></td>
            </tr>
            <tr>
              <td class="border border-black ps-2">Opening Balance</td>
              <td class="border border-black ps-2">
                {""}
                {formatAsRupees(
                  parseInt(
                    balancesheetData && balancesheetData.assets.OpeningBalance
                  )
                )}
              </td>
              <td class="border border-black ps-2"></td>
            </tr>
            <tr>
              <td class="border border-black ps-2">
                Cash and Cash Equivalents
              </td>
              <td class="border border-black ps-2"></td>
              <td class="border border-black ps-2"></td>
            </tr>
            <tr>
              <td class="border border-black ps-2">Accounts Receivable</td>
              <td class="border border-black ps-2">
                {" "}
                {formatAsRupees(
                  balancesheetData && balancesheetData.assets.accountsReceivable
                )}
              </td>
              <td class="border border-black ps-2"></td>
            </tr>
            <tr>
              <td class="border border-black ps-2">Inventory</td>
              <td class="border border-black ps-2">
                {formatAsRupees(
                  balancesheetData && balancesheetData.assets.inventory
                )}
              </td>
              <td class="border border-black ps-2"></td>
            </tr>
            <tr>
              <td class="border border-black ps-2">Prepaid Expenses</td>
              <td class="border border-black ps-2"></td>
              <td class="border border-black ps-2"></td>
            </tr>
            <tr>
              <td class="border border-black p-3"></td>
              <td class="border border-black p-3"></td>
              <td class="border border-black p-3"></td>
            </tr>
            {/* <tr>
                <td class="border border-black ps-2 font-bold">Fixed Assets</td>
                <td class="border border-black ps-2"></td>
                <td class="border border-black ps-2"></td>
                </tr>
                <tr>
                <td class="border border-black ps-2">
                    Property, Plant and Equipment
                </td>
                <td class="border border-black ps-2">1,50,000</td>
                <td class="border border-black ps-2"></td>
                </tr>
                <tr>
                <td class="border border-black ps-2">Accumulated Depreciation</td>
                <td class="border border-black ps-2">-30,000</td>
                <td class="border border-black ps-2"></td>
                </tr>
                <tr>
                <td class="border border-black ps-2">Not Fixed Assets</td>
                <td class="border border-black ps-2"></td>
                <td class="border border-black ps-2">1,20,000</td>
                </tr> */}
            <tr>
              <td class="border border-black ps-2 font-bold">Total</td>
              <td class="border border-black ps-2"></td>
              <td class="border border-black ps-2 font-bold">
                {formatAsRupees(
                  parseInt(
                    balancesheetData && balancesheetData.assets.inventory
                  ) +
                    parseInt(
                      balancesheetData &&
                        balancesheetData.assets.accountsReceivable
                    ) +
                    parseInt(
                      balancesheetData && balancesheetData.assets.OpeningBalance
                    )
                )}
              </td>
            </tr>
          </table>
        </section>
      </section>
    </>
  );
};

export default Balancesheet;
const formatAsRupees = (amount) => {
  if (amount === undefined || amount === null) {
    return ""; // or any default value you prefer
  }
  return amount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
};
