import React from "react";
import { useLocation } from "react-router-dom";

const PrintBill = () => {
  const location = useLocation();
  const largeData = location.state?.Inputs;
  return (
    <div className="flex h-full w-full flex justify-center">
      <div className="h-3/4 w-3/4 ">
        <section class="bill ">
          <div class="border-t-4 border border-red-700"></div>
          <div class="container">
            <div class="grid grid-cols-2 py-6">
              <div class="space-y-2">
                <h1 class="font-bold">My Business</h1>
                <i class="text-sm">Phone: 3456765431</i>
                <p class="text-sm font-bold">
                  GSTIN:27AAAAPO267H2ZN | State of supply:
                </p>
                <p class="font-bold">MAHARASTRA</p>
              </div>
              <div class="text-end space-y-2">
                <h1 class="font-bold">Invoice No.1</h1>
                <p>Due Date:21 Feb 2024 | Invoice Date:21 Feb 2024</p>
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
                <h1 class="font-bold">Isha</h1>
                <p class="text-sm">GSTIN:27AAAAPO267H2ZN | State of supply:</p>
              </div>
              <div class="text-end pt-10 space-y-2">
                <p class="text-sm">Total amount</p>
                <h1 class="text-3xl font-bold">$345</h1>
                <p class="text-sm">Three Hundred Fourty Five Dollers</p>
                <p class="text-sm text-red-700 font-bold">Invoice: Unpaid</p>
              </div>
            </div>
            {/* <!-- end grid --> */}
          </div>
          {/* <!-- end container --> */}
        </section>

        <section class="my-6">
          <div class="container">
            <div class="border border-blue-700 rounded-xl px-3 py-5">
              <table class="w-full">
                <thead>
                  <tr class="border-b-2 border-black">
                    <th class="py-2">#</th>
                    <th class="py-2">Item Details</th>
                    <th class="py-2">Price/Unit</th>
                    <th class="py-2">Qty</th>
                    <th class="py-2">Total Rate</th>
                    <th class="py-2">Total Tax</th>
                    <th class="py-2">Item Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-blue-700 text-center">
                    <td class="py-2">01</td>
                    <td class="py-2">PC</td>
                    <td class="py-2">5000/PCS</td>
                    <td class="py-2">1</td>
                    <td class="py-2">5000</td>
                    <td class="py-2">375(7.5%)</td>
                    <td class="py-2 bg-blue-50">5375</td>
                  </tr>
                  <tr class="text-center font-bold border-b border-blue-700 bg-blue-50">
                    <td class="py-2">Sub-total Amount</td>
                    <td></td>
                    <td></td>
                    <td class="py-2">1</td>
                    <td class="py-2">5000</td>
                    <td class="py-2">375</td>
                    <td class="py-2">5375</td>
                  </tr>
                </tbody>
              </table>
              <table class="w-[50%] mt-12">
                <tr class="border-b-2 border-black">
                  <th class="py-2">Tax Slab</th>
                  <th class="py-2">Taxable Amount</th>
                  <th class="py-2">Tax</th>
                </tr>
                <tr class="border-b border-dashed border-blue-700 text-center">
                  <td class="py-2">CGST-3.75 %</td>
                  <td class="py-2">5000</td>
                  <td class="py-2">187.50</td>
                </tr>
                <tr class="border-b border-dashed border-blue-700 text-center">
                  <td class="py-2">CGST-3.75 %</td>
                  <td class="py-2">5000</td>
                  <td class="py-2">187.50</td>
                </tr>
              </table>
              <div class="text-end pt-10 space-y-2">
                <p>Total amount</p>
                <h1 class="text-3xl font-bold">$345</h1>
                <p class="text-sm">Three Hundred Fourty Five Dollers</p>
                <p class="text-sm text-red-700 font-bold">Invoice: Unpaid</p>
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
