import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { company, fetchDetailsComapny } from "../reducer/Company_reducer";
import { gstbill } from "../reducer/billing_reducer";
const GSTR = () => {
  let dispatch = useDispatch();
  let [cmpdata, setcompany] = useState();
  let [data, setdate] = useState([]);
  useEffect(() => {
    dispatch(fetchDetailsComapny());
    dispatch(gstbill());
  }, []);

  // let cmpDate = useSelector((state) => state.CompanyReducer);
  const cdata = useSelector((state) => state.CompanyReducer.result?.data);
  const gstdata = useSelector(
    (state) => state.BillingReducer.gstBilldata?.data
  );
  function calculateTotalTaxAmount(items) {
    let totalTax = 0;
    let totalAmount = 0;
    items.forEach((item) => {
      let gstRate = parseFloat(item.GST);
      let itemAmount = parseFloat(item.amount);
      let basePrice = itemAmount / (1 + gstRate / 100);
      let gstAmount = itemAmount - basePrice;
      totalTax += parseFloat(gstAmount.toFixed(2)); // Add GST amount to total tax
      totalAmount += itemAmount; // Add item amount to total amount
    });
    let gstRate = ((totalTax / totalAmount) * 100).toFixed(2); // Calculate GST rate
    return { totalTax: totalTax.toFixed(2), gstRate: gstRate }; // Rounding to 2 decimal places
  }
  let [colspan, setcolspan] = useState();
  useEffect(() => {
    if (cdata) {
      setcompany(cdata[0]);
    }
  }, [cdata]);
  useEffect(() => {
    console.log(gstdata);
    if (gstdata) {
      setdate(gstdata);
    }
  }, [data]);
  return (
    <section className=" flex justify-center items-center ">
      <></>
      <section className="w-4/5  h-full bg-white p-5 border rounded-md">
        <section>
          <div class="container">
            <div class="grid grid-cols-2">
              <div>
                <h1 class="text-xl font-bold">
                  {cmpdata && cmpdata.companyName}
                </h1>
                <p class="text-lg">
                  Phone Number:{cmpdata && cmpdata.phoneNumber}
                </p>
              </div>
              <div class="text-end">
                <h1 class="text-xl font-bold">GSTR1 Report</h1>
                {/* <p class="text-lg">01 Mar 2024 to 31 Mar 2024</p> */}
              </div>
            </div>
          </div>
        </section>

        <section class="container py-10">
          <table class="w-full border-collapse">
            <tr>
              <td class="border border-black ps-2">1. GST IN</td>
              <td class="border border-black ps-2">
                {cmpdata && cmpdata.gstNumber}
              </td>
            </tr>
            <tr>
              <td class="border border-black ps-2">
                2.(a) Legal name ofthe registered person
              </td>
              <td class="border border-black ps-2"></td>
            </tr>
            <tr>
              <td class="border border-black ps-5">(b) Trade name if any </td>
              <td class="border border-black ps-2">
                {cmpdata && cmpdata.companyName}
              </td>
            </tr>
          </table>
        </section>

        <section class="container">
          <h1 class="text-xl font-bold pb-5">Sale</h1>

          <table class="text-center">
            <tr>
              <th rowspan="2" class="border border-black px-2">
                GSTIN/UIN No
              </th>
              <th colspan="4" class="border border-black px-2">
                Invoice
              </th>
              <th rowspan="2" class="border border-black px-2">
                Rate
              </th>
              <th rowspan="2" class="border border-black px-2">
                CESS Rate
              </th>
              <th rowspan="2" class="border border-black px-2">
                Taxable Value
              </th>
              <th colspan="5" class="border border-black px-2">
                Tax Amount
              </th>
              <th rowspan="2" class="border border-black px-2">
                Place of supply
              </th>
            </tr>
            <tr>
              <td class="border border-black px-2">Party Name</td>
              <td class="border border-black px-2">No.</td>
              <td class="border border-black px-2">Date</td>
              <td class="border border-black px-2">Value</td>
              <td class="border border-black px-2">Integrated Tax</td>
              <td class="border border-black px-2">Central Tax</td>
              <td class="border border-black px-2">State/UT Tax</td>
              <td class="border border-black px-2">CESS</td>
              <td class="border border-black px-2">Additional CESS</td>
            </tr>
            {gstdata &&
              gstdata.map((party, i) => (
                <>
                  <tr>
                    <td rowspan="2" class="border border-black"></td>

                    <td rowspan="2" class="border border-black">
                      {party.bPartyName}
                    </td>
                    <td rowspan="2" class="border border-black">
                      {party.invoiceNo}
                    </td>
                    <td rowspan="2" class="border border-black">
                      {party.invoiceDate}
                    </td>
                    <td rowspan="2" class="border border-black">
                      {" "}
                      ₹ {party.gtotalAmount}
                    </td>

                    <>
                      <td class="border border-black">
                        {calculateTotalTaxAmount(party.items).gstRate + "%"}
                      </td>
                      <td class="border border-black">
                        {calculateTotalTaxAmount(party.items).gstRate + "%"}
                      </td>
                      <td class="border border-black">
                        ₹ {calculateTotalTaxAmount(party.items).totalTax}
                      </td>
                      <td class="border border-black">₹ 0</td>
                      <td class="border border-black">
                        {" "}
                        ₹ {calculateTotalTaxAmount(party.items).totalTax / 2}
                      </td>
                      <td class="border border-black">
                        {" "}
                        ₹ {calculateTotalTaxAmount(party.items).totalTax / 2}
                      </td>
                      <td class="border border-black">₹ 0</td>
                      <td class="border border-black">₹ 0</td>
                      <td rowspan="2" class="border border-black">
                        {party.bStateCode}
                      </td>
                    </>
                  </tr>
                </>
              ))}
          </table>
        </section>

        <section class="container">
          <h1 class="text-xl font-bold py-5">Sale Return</h1>
          <table class="text-center">
            <tr>
              <th rowspan="2" class="border border-black px-2">
                GSTIN/UIN No
              </th>
              <th colspan="6" class="border border-black px-2">
                Credit Note
              </th>
              <th rowspan="2" class="border border-black px-2">
                Rate
              </th>
              <th rowspan="2" class="border border-black px-2">
                CESS Rate
              </th>
              <th rowspan="2" class="border border-black px-2">
                Taxable Value
              </th>
              <th colspan="5" class="border border-black px-2">
                Tax Amount
              </th>
              <th rowspan="2" class="border border-black px-2">
                Place of supply
              </th>
            </tr>
            <tr>
              <td class="border border-black px-2">Party Name</td>
              <td class="border border-black px-2">No.</td>
              <td class="border border-black px-2">Date</td>
              <td class="border border-black px-2">Invoice No.</td>
              <td class="border border-black px-2">Invoice Date</td>
              <td class="border border-black px-2">Value</td>
              <td class="border border-black px-2">Integrated Tax</td>
              <td class="border border-black px-2">Central Tax</td>
              <td class="border border-black px-2">State/UT Tax</td>
              <td class="border border-black px-2">CESS</td>
              <td class="border border-black px-2">Additional CESS</td>
            </tr>
          </table>
        </section>
      </section>
    </section>
  );
};

export default GSTR;
