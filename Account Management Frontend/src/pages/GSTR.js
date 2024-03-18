import React from "react";

const GSTR = () => {
  return (
    <div>
      <div class="container mx-auto py-8">
        <div class="bg-white shadow-md rounded-lg p-6">
          <div class="flex justify-between mb-4">
            <div>
              <h1 class="text-2xl font-bold">Khatu</h1>
              <p class="text-gray-600">9998208299</p>
            </div>
            <div class="text-right">
              <h2 class="text-xl font-bold">GSTR1 Report</h2>
              <p class="text-gray-600">01 Mar 2024 to 31 Mar 2024</p>
            </div>
          </div>
          <div class="mb-4">
            <p class="text-lg font-bold">1 GSTN</p>
            <p>18PATL0598L7Z8</p>
          </div>
          <div class="mb-4">
            <p class="text-lg font-bold">
              2 All legal name of the registered person
            </p>
            <p></p>
          </div>
          <div class="mb-4">
            <p class="text-lg font-bold">b) Trade name, if any</p>
            <p>Khatu</p>
          </div>

          <div class="mb-8">
            <h3 class="text-xl font-bold mb-4">Sale</h3>
            <table class="w-full border">
              <thead>
                <tr class="bg-gray-200">
                  <th class="py-2 px-4 border">GSTN/UIN No.</th>
                  <th class="py-2 px-4 border">Party Name</th>
                  <th class="py-2 px-4 border">Invoice No.</th>
                  <th class="py-2 px-4 border">Date</th>
                  <th class="py-2 px-4 border">Value</th>
                  <th class="py-2 px-4 border">Rate</th>
                  <th class="py-2 px-4 border">CESS Rate</th>
                  <th class="py-2 px-4 border">Taxable Value</th>
                  <th class="py-2 px-4 border">Tax Amount Integrated Tax</th>
                  <th class="py-2 px-4 border">Central Tax</th>
                  <th class="py-2 px-4 border">State/UT Tax</th>
                  <th class="py-2 px-4 border">CESS</th>
                  <th class="py-2 px-4 border">Additional CESS</th>
                  <th class="py-2 px-4 border">Place of supply</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="py-2 px-4 border"></td>
                  <td class="py-2 px-4 border">Jay</td>
                  <td class="py-2 px-4 border">3</td>
                  <td class="py-2 px-4 border">18 Mar 24</td>
                  <td class="py-2 px-4 border">₹ 200</td>
                  <td class="py-2 px-4 border">
                    5% <br /> 6%
                  </td>
                  <td class="py-2 px-4 border">0%</td>
                  <td class="py-2 px-4 border">
                    ₹ 95.24 <br /> ₹ 94.34
                  </td>
                  <td class="py-2 px-4 border">₹ 0</td>
                  <td class="py-2 px-4 border">
                    ₹ 2.38 <br /> ₹ 2.83
                  </td>
                  <td class="py-2 px-4 border">
                    ₹ 2.38 <br /> ₹ 2.83
                  </td>
                  <td class="py-2 px-4 border">₹ 0</td>
                  <td class="py-2 px-4 border">₹ 0</td>
                  <td class="py-2 px-4 border"></td>
                </tr>
                <tr>
                  <td class="py-2 px-4 border"></td>
                  <td class="py-2 px-4 border">Fam</td>
                  <td class="py-2 px-4 border">1</td>
                  <td class="py-2 px-4 border">12 Mar 24</td>
                  <td class="py-2 px-4 border">₹ 500</td>
                  <td class="py-2 px-4 border">3%</td>
                  <td class="py-2 px-4 border">0%</td>
                  <td class="py-2 px-4 border">₹ 485.44</td>
                  <td class="py-2 px-4 border">₹ 14.56</td>
                  <td class="py-2 px-4 border">₹ 0</td>
                  <td class="py-2 px-4 border">₹ 0</td>
                  <td class="py-2 px-4 border">₹ 0</td>
                  <td class="py-2 px-4 border">₹ 0</td>
                  <td class="py-2 px-4 border">Andhra Pradesh</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h3 class="text-xl font-bold mb-4">Sale Return</h3>
            <table class="w-full border">
              <thead>
                <tr class="bg-gray-200">
                  <th class="py-2 px-4 border">GSTN/UIN No.</th>
                  <th class="py-2 px-4 border">Party Name</th>
                  <th class="py-2 px-4 border">Credit Note No.</th>
                  <th class="py-2 px-4 border">Date</th>
                  <th class="py-2 px-4 border">Invoice No.</th>
                  <th class="py-2 px-4 border">Invoice Date</th>
                  <th class="py-2 px-4 border">Value</th>
                  <th class="py-2 px-4 border">Rate</th>
                  <th class="py-2 px-4 border">CESS Rate</th>
                  <th class="py-2 px-4 border">Taxable Value</th>
                  <th class="py-2 px-4 border">Tax Amount Integrated Tax</th>
                  <th class="py-2 px-4 border">Central Tax</th>
                  <th class="py-2 px-4 border">State/UT Tax</th>
                  <th class="py-2 px-4 border">CESS</th>
                  <th class="py-2 px-4 border">Additional CESS</th>
                  <th class="py-2 px-4 border">Place of supply</th>
                </tr>
              </thead>
              <tbody>
                {/* <!-- Add rows for Sale Return data if available --> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GSTR;
