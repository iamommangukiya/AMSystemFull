import React, { useContext, useEffect } from "react";

import { NavLink } from "react-router-dom";
import AppContext from "../context/AppContext";
import { hover } from "@testing-library/user-event/dist/hover";
import Logo1 from "../assets/images/logo5.png";
import Logo2 from "../assets/images/logo6.png";

const Sidebar = () => {
  useEffect(() => {
    console.log("object");
  }, []);
  const context = useContext(AppContext);
  const { activeMenu, activeSubMenu, updateMenu, updateSubMenu } = context;

  return (
    <>
      <nav className="sidebar absolute z-10  flex-none h-full w-[240px] border-r dark:bg-darkborder border-white/10 transition-all duration-300 overflow-hidden">
        <div className="bg-[#225777] dark:bg-darklight h-full">
          <div className="p-4">
            <a href="#" className="main-logo w-full">
              <img
                src={Logo1}
                height={200}
                width={130}
                className="mx-auto dark-logo h-7  dark:hidden"
                alt="logo"
              />
              <img
                src={Logo2}
                height={200}
                width={130}
                className="mx-auto light-logo h-7 logo hidden dark:block"
                alt=""
              />
            </a>
          </div>

          <div className="h-[calc(100vh-60px)]  overflow-y-auto overflow-x-hidden px-5 pb-4 space-y-16 detached-menu">
            <ul
              className="relative flex flex-col gap-1 "
              x-data="{ activeMenu: 'apps' }"
            >
              <h2 className="my-2 text-white dark:text-white/30">
                <span>Menu</span>
              </h2>
              <div className="flex menu nav-item items-center">
                <NavLink to="/dashboard">
                  <svg
                    viewBox="-0.5 0 155 155"
                    className="h-5 w-5 text-white"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0)">
                      <path
                        d="M147.754 8.64794L148.453 8.51304C149.253 8.35804 150.009 8.21147 150.746 8.03896C151.547 7.87683 152.27 7.45016 152.799 6.82776C153.328 6.20529 153.633 5.42313 153.664 4.60663C153.695 3.79013 153.452 2.98673 152.973 2.32536C152.493 1.66399 151.805 1.18296 151.019 0.959567C149.476 0.499892 147.875 0.269647 146.265 0.276516C142.223 0.374445 138.116 0.51743 134.142 0.655565C128.745 0.842344 123.165 1.03614 117.679 1.1198C92.8631 1.49984 65.7555 1.84758 34.8053 2.18222C27.9566 2.25681 20.9996 2.08473 14.8615 1.93427C12.9062 1.88628 10.9113 1.72665 8.98328 1.57295C7.74566 1.47437 6.50802 1.37868 5.26976 1.3041C2.62532 1.15494 1.60164 2.60113 1.2146 3.84632C0.636316 5.70761 1.46616 7.48116 3.37931 8.47601C3.9443 8.75728 4.52506 9.0056 5.1187 9.21988L5.48175 9.36016C5.48175 10.6105 5.48436 11.8539 5.48955 13.0905C5.49668 15.9998 5.50509 19.0078 5.47591 21.9489C5.39682 30.0693 5.21661 38.327 5.03962 46.3124C4.54367 68.8734 4.03149 92.2025 5.75274 115.158C6.04123 119.005 7.28212 120.359 10.8582 120.732C13.8611 121.075 16.8823 121.233 19.9046 121.205C28.6075 121.016 37.4536 120.76 46.0086 120.512C49.506 120.409 53.004 120.309 56.5027 120.211C56.9981 120.197 57.4947 120.199 58.1332 120.203C57.9219 120.462 57.7164 120.715 57.518 120.958C56.6032 122.078 55.813 123.044 55.0791 124.061C50.5351 130.352 45.3843 137.486 40.3762 144.617C39.4934 145.968 38.8161 147.443 38.3664 148.993C38.0689 149.87 38.0693 150.822 38.3673 151.699C38.6654 152.577 39.2446 153.331 40.015 153.845C40.7204 154.367 41.576 154.645 42.4533 154.639C43.5487 154.624 44.6078 154.244 45.4634 153.56C46.2835 152.899 47.0182 152.138 47.6508 151.296C54.1851 142.884 60.7057 134.461 67.3198 125.919L72.0596 119.796L90.0384 119.208L93.6041 124.903C96.5403 129.598 99.4272 134.215 102.325 138.826C102.829 139.627 103.33 140.43 103.829 141.233C105.59 144.06 107.411 146.982 109.349 149.764C110.428 151.275 111.804 152.551 113.392 153.512C114.265 154.094 115.305 154.368 116.351 154.291C117.397 154.216 118.387 153.793 119.167 153.092C120.014 152.4 120.613 151.451 120.874 150.387C121.134 149.324 121.042 148.206 120.61 147.2C120.009 145.727 119.259 144.319 118.371 142.999C114.856 137.749 111.326 132.508 107.779 127.279C106.039 124.706 104.3 122.132 102.563 119.557C102.488 119.442 102.42 119.322 102.361 119.198C102.656 119.165 102.923 119.139 103.181 119.133C106.397 119.071 109.613 119.014 112.829 118.961C120.249 118.831 127.923 118.702 135.469 118.49C137.359 118.398 139.243 118.193 141.109 117.876C142.082 117.73 143.09 117.579 144.076 117.466C146.625 117.175 148.189 115.589 148.725 112.752C148.912 111.555 148.986 110.344 148.946 109.133V108.985C148.937 104.387 148.934 99.7898 148.936 95.191C148.936 83.341 148.932 71.0882 148.787 59.0358C148.657 48.2487 148.381 37.2842 148.116 26.6812C147.992 21.7113 147.872 16.7412 147.756 11.7712C147.739 10.9703 147.743 10.1682 147.749 9.33292C147.751 9.10853 147.753 8.88011 147.754 8.64794ZM16.4381 111.194L16.3895 111.18L16.3487 110.93C16.262 110.458 16.2037 109.981 16.1743 109.503C16.0498 106.325 15.9151 103.147 15.7704 99.9694C15.4385 92.4211 15.0948 84.616 14.9762 76.9406C14.7999 65.6106 14.7344 54.0869 14.6722 42.9431C14.6313 35.7631 14.5892 28.3382 14.5179 21.0357C14.4939 18.5544 14.3273 16.0789 14.1516 13.4575C14.0828 12.4289 14.0122 11.3765 13.948 10.2902C47.1633 11.3894 80.8383 10.6791 113.412 9.98651C121.645 9.81271 130.149 9.63313 138.545 9.48396V108.065C97.2164 107.474 56.2862 108.554 16.89 111.28C16.7368 111.266 16.5854 111.238 16.4381 111.194Z"
                        fill="currentColor"
                      />
                      <path
                        d="M129.763 30.0757C130.806 28.9307 131.543 27.5392 131.902 26.0315C132.084 25.364 132.101 24.6619 131.95 23.9865C131.8 23.311 131.486 22.6827 131.037 22.1561C130.588 21.6296 130.017 21.2205 129.374 20.9648C128.732 20.7092 128.036 20.6147 127.348 20.6893C126.033 20.8397 124.777 21.3187 123.694 22.0824C122.265 23.1156 120.908 24.2456 119.633 25.4641L119.298 25.77C109.536 34.6674 99.7584 43.5905 89.9658 52.5385L81.165 60.5736L81.1436 60.5635C77.8146 56.7287 73.7458 53.7084 69.8106 50.788C67.8566 49.3385 65.8358 47.8384 63.9434 46.2644C61.319 44.084 59.3683 44.0225 56.4879 46.031C54.9151 47.1538 53.4837 48.4624 52.2246 49.9286C49.4181 53.1297 46.5999 56.4139 43.8751 59.5885C41.6618 62.1679 39.4431 64.742 37.2189 67.3103C35.1374 69.7027 33.0437 72.0855 30.9375 74.4578C28.2367 77.5163 25.4438 80.6792 22.7352 83.8259C21.5741 85.1223 20.6579 86.6191 20.0311 88.2437C19.8824 88.8689 19.877 89.5194 20.0152 90.1472C20.1534 90.775 20.4317 91.3632 20.8291 91.8677C21.0832 92.1713 21.4018 92.4145 21.7618 92.5792C22.1217 92.7439 22.5138 92.8263 22.9095 92.8198C23.6723 92.7997 24.4139 92.5643 25.049 92.1414C25.5619 91.8113 26.0322 91.4189 26.4493 90.9741L28.7832 88.5245C36.9778 79.934 45.4511 71.0517 53.7579 62.2884C55.1387 60.8318 56.4885 59.2982 57.918 57.6736C58.4788 57.0368 59.0597 56.3765 59.6684 55.6884C60.6802 56.7512 61.6788 57.8037 62.6643 58.8466C65.6394 61.9881 68.4498 64.9568 71.3659 67.9076C72.728 69.2909 74.2729 70.4816 75.9578 71.4473C78.2671 72.7547 80.4733 72.7651 82.3346 71.4778C83.8257 70.4784 85.2636 69.4031 86.6432 68.2546L90.922 64.5916C100.21 56.6405 109.813 48.419 119.184 40.2448C122.973 36.936 126.508 33.3988 129.763 30.0757Z"
                        fill="currentColor"
                      />
                    </g>
                  </svg>
                  <span className="pl-1.5 text-white text-sm">Dashboard</span>
                </NavLink>
              </div>
              <li className="menu nav-item">
                <a
                  href="javaScript:;"
                  class={`nav-link group justify-between flex items-center text-white py-2 cursor-pointer  ${
                    activeMenu === "Master" ? "active" : ""
                  }`}
                  onClick={() => updateMenu("Master")}
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-white"
                    >
                      <path
                        d="M7.5 11.5C5.01472 11.5 3 9.48528 3 7C3 4.51472 5.01472 2.5 7.5 2.5C9.98528 2.5 12 4.51472 12 7C12 9.48528 9.98528 11.5 7.5 11.5ZM7.5 21.5C5.01472 21.5 3 19.4853 3 17C3 14.5147 5.01472 12.5 7.5 12.5C9.98528 12.5 12 14.5147 12 17C12 19.4853 9.98528 21.5 7.5 21.5ZM17.5 11.5C15.0147 11.5 13 9.48528 13 7C13 4.51472 15.0147 2.5 17.5 2.5C19.9853 2.5 22 4.51472 22 7C22 9.48528 19.9853 11.5 17.5 11.5ZM17.5 21.5C15.0147 21.5 13 19.4853 13 17C13 14.5147 15.0147 12.5 17.5 12.5C19.9853 12.5 22 14.5147 22 17C22 19.4853 19.9853 21.5 17.5 21.5ZM7.5 9.5C8.88071 9.5 10 8.38071 10 7C10 5.61929 8.88071 4.5 7.5 4.5C6.11929 4.5 5 5.61929 5 7C5 8.38071 6.11929 9.5 7.5 9.5ZM7.5 19.5C8.88071 19.5 10 18.3807 10 17C10 15.6193 8.88071 14.5 7.5 14.5C6.11929 14.5 5 15.6193 5 17C5 18.3807 6.11929 19.5 7.5 19.5ZM17.5 9.5C18.8807 9.5 20 8.38071 20 7C20 5.61929 18.8807 4.5 17.5 4.5C16.1193 4.5 15 5.61929 15 7C15 8.38071 16.1193 9.5 17.5 9.5ZM17.5 19.5C18.8807 19.5 20 18.3807 20 17C20 15.6193 18.8807 14.5 17.5 14.5C16.1193 14.5 15 15.6193 15 17C15 18.3807 16.1193 19.5 17.5 19.5Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span className="pl-1.5 text-white text-sm">
                      PARTIES & INVENTORY
                    </span>
                  </div>
                </a>
                <ul
                  x-cloak
                  x-collapse
                  className="sub-menu flex flex-col gap-1 text-white dark:text-white/60 list-none"
                  style={{ listStyle: "none" }}
                >
                  <li className=" flex items-center text-white py-1 cursor-pointer">
                    <NavLink to="/dashboard/party">Clients</NavLink>
                  </li>
                  <li className=" flex items-center text-white py-1 cursor-pointer ">
                    {/* <a href="javascript:;">
                      Projects{" "}
                      <span className="bg-danger/10 ms-3 text-danger text-xs rounded px-2 inline-block py-1 leading-none">
                        Soon
                      </span>
                    </a> */}
                    <NavLink to="/dashboard/itemmaster">Inventories</NavLink>
                  </li>
                </ul>
              </li>
              <li className="menu nav-item">
                <a
                  href="javaScript:;"
                  class={`nav-link group justify-between flex items-center text-white py-2 cursor-pointer  ${
                    activeMenu === "TrasctionMaster" ? "active" : ""
                  }`}
                  onClick={() => updateMenu("TrasctionMaster")}
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-white"
                    >
                      <path
                        d="M7.5 11.5C5.01472 11.5 3 9.48528 3 7C3 4.51472 5.01472 2.5 7.5 2.5C9.98528 2.5 12 4.51472 12 7C12 9.48528 9.98528 11.5 7.5 11.5ZM7.5 21.5C5.01472 21.5 3 19.4853 3 17C3 14.5147 5.01472 12.5 7.5 12.5C9.98528 12.5 12 14.5147 12 17C12 19.4853 9.98528 21.5 7.5 21.5ZM17.5 11.5C15.0147 11.5 13 9.48528 13 7C13 4.51472 15.0147 2.5 17.5 2.5C19.9853 2.5 22 4.51472 22 7C22 9.48528 19.9853 11.5 17.5 11.5ZM17.5 21.5C15.0147 21.5 13 19.4853 13 17C13 14.5147 15.0147 12.5 17.5 12.5C19.9853 12.5 22 14.5147 22 17C22 19.4853 19.9853 21.5 17.5 21.5ZM7.5 9.5C8.88071 9.5 10 8.38071 10 7C10 5.61929 8.88071 4.5 7.5 4.5C6.11929 4.5 5 5.61929 5 7C5 8.38071 6.11929 9.5 7.5 9.5ZM7.5 19.5C8.88071 19.5 10 18.3807 10 17C10 15.6193 8.88071 14.5 7.5 14.5C6.11929 14.5 5 15.6193 5 17C5 18.3807 6.11929 19.5 7.5 19.5ZM17.5 9.5C18.8807 9.5 20 8.38071 20 7C20 5.61929 18.8807 4.5 17.5 4.5C16.1193 4.5 15 5.61929 15 7C15 8.38071 16.1193 9.5 17.5 9.5ZM17.5 19.5C18.8807 19.5 20 18.3807 20 17C20 15.6193 18.8807 14.5 17.5 14.5C16.1193 14.5 15 15.6193 15 17C15 18.3807 16.1193 19.5 17.5 19.5Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span className="pl-1.5 text-sm text-white">
                      TrasctionMaster
                    </span>
                  </div>
                </a>
                <ul
                  x-cloak
                  x-collapse
                  className="sub-menu flex flex-col gap-1 text-white dark:text-white/60 "
                >
                  <li className=" flex items-center text-white py-1 cursor-pointer ">
                    <NavLink to="/dashboard/Recipt">Debit transaction</NavLink>
                  </li>

                  <li className=" flex items-center text-white py-1 cursor-pointer ">
                    {/* <a href="javascript:;">
                      Projects{" "}
                      <span className="bg-danger/10 ms-3 text-danger text-xs rounded px-2 inline-block py-1 leading-none">
                        Soon
                      </span>
                    </a> */}
                    <NavLink to="/dashboard/Payment">
                      Credit transaction
                    </NavLink>
                  </li>
                  <li className=" flex items-center text-white py-1 cursor-pointer ">
                    <NavLink to="/dashboard/transectionrecord">
                      Transactions
                    </NavLink>
                  </li>
                  <li className=" flex items-center text-white py-1 cursor-pointer ">
                    <NavLink to="/dashboard/PurchaseBill">
                      Purchase bill
                    </NavLink>
                  </li>
                  <li className=" flex items-center text-white py-1 cursor-pointer ">
                    <NavLink to="/dashboard/SaleBill">Sales bill</NavLink>
                  </li>
                  <li className=" flex items-center text-white py-1 cursor-pointer ">
                    <NavLink to="/dashboard/deliveryChallan">
                      Delivery challan
                    </NavLink>
                  </li>
                  <li className=" flex items-center text-white py-1 cursor-pointer ">
                    <NavLink to="/dashboard/quotation">Quotations</NavLink>
                  </li>
                </ul>
              </li>
              <li className="menu nav-item">
                <a
                  href="javaScript:;"
                  class={`nav-link group justify-between flex items-center text-white py-2 cursor-pointer   ${
                    activeMenu === "Report" ? "active" : ""
                  }`}
                  onClick={() => updateMenu("Report")}
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-white"
                    >
                      <path
                        d="M7.5 11.5C5.01472 11.5 3 9.48528 3 7C3 4.51472 5.01472 2.5 7.5 2.5C9.98528 2.5 12 4.51472 12 7C12 9.48528 9.98528 11.5 7.5 11.5ZM7.5 21.5C5.01472 21.5 3 19.4853 3 17C3 14.5147 5.01472 12.5 7.5 12.5C9.98528 12.5 12 14.5147 12 17C12 19.4853 9.98528 21.5 7.5 21.5ZM17.5 11.5C15.0147 11.5 13 9.48528 13 7C13 4.51472 15.0147 2.5 17.5 2.5C19.9853 2.5 22 4.51472 22 7C22 9.48528 19.9853 11.5 17.5 11.5ZM17.5 21.5C15.0147 21.5 13 19.4853 13 17C13 14.5147 15.0147 12.5 17.5 12.5C19.9853 12.5 22 14.5147 22 17C22 19.4853 19.9853 21.5 17.5 21.5ZM7.5 9.5C8.88071 9.5 10 8.38071 10 7C10 5.61929 8.88071 4.5 7.5 4.5C6.11929 4.5 5 5.61929 5 7C5 8.38071 6.11929 9.5 7.5 9.5ZM7.5 19.5C8.88071 19.5 10 18.3807 10 17C10 15.6193 8.88071 14.5 7.5 14.5C6.11929 14.5 5 15.6193 5 17C5 18.3807 6.11929 19.5 7.5 19.5ZM17.5 9.5C18.8807 9.5 20 8.38071 20 7C20 5.61929 18.8807 4.5 17.5 4.5C16.1193 4.5 15 5.61929 15 7C15 8.38071 16.1193 9.5 17.5 9.5ZM17.5 19.5C18.8807 19.5 20 18.3807 20 17C20 15.6193 18.8807 14.5 17.5 14.5C16.1193 14.5 15 15.6193 15 17C15 18.3807 16.1193 19.5 17.5 19.5Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span className="pl-1.5 text-sm text-white">Report</span>
                  </div>
                </a>
                <ul
                  x-cloak
                  x-collapse
                  className="sub-menu flex flex-col gap-1 text-white dark:text-white/60"
                >
                  <li className=" flex items-center text-white py-1 cursor-pointer ">
                    <NavLink to="/dashboard/Purchase">Purchase report</NavLink>
                  </li>
                  <li className=" flex items-center text-white py-1 cursor-pointer ">
                    <NavLink to="/dashboard/Salse">Sales report</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/gst">Gst Sales</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/gst2">Gst Purchase</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/balancesheet">
                      Balance Sheet
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/AccountPay">
                      Accounts payable (AP)
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/Accountrec">
                      Accounts receivable (AR)
                    </NavLink>
                  </li>
                  <li></li>
                  <NavLink to="/dashboard/help" className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-white"
                    >
                      <path
                        d="M7.5 11.5C5.01472 11.5 3 9.48528 3 7C3 4.51472 5.01472 2.5 7.5 2.5C9.98528 2.5 12 4.51472 12 7C12 9.48528 9.98528 11.5 7.5 11.5ZM7.5 21.5C5.01472 21.5 3 19.4853 3 17C3 14.5147 5.01472 12.5 7.5 12.5C9.98528 12.5 12 14.5147 12 17C12 19.4853 9.98528 21.5 7.5 21.5ZM17.5 11.5C15.0147 11.5 13 9.48528 13 7C13 4.51472 15.0147 2.5 17.5 2.5C19.9853 2.5 22 4.51472 22 7C22 9.48528 19.9853 11.5 17.5 11.5ZM17.5 21.5C15.0147 21.5 13 19.4853 13 17C13 14.5147 15.0147 12.5 17.5 12.5C19.9853 12.5 22 14.5147 22 17C22 19.4853 19.9853 21.5 17.5 21.5ZM7.5 9.5C8.88071 9.5 10 8.38071 10 7C10 5.61929 8.88071 4.5 7.5 4.5C6.11929 4.5 5 5.61929 5 7C5 8.38071 6.11929 9.5 7.5 9.5ZM7.5 19.5C8.88071 19.5 10 18.3807 10 17C10 15.6193 8.88071 14.5 7.5 14.5C6.11929 14.5 5 15.6193 5 17C5 18.3807 6.11929 19.5 7.5 19.5ZM17.5 9.5C18.8807 9.5 20 8.38071 20 7C20 5.61929 18.8807 4.5 17.5 4.5C16.1193 4.5 15 5.61929 15 7C15 8.38071 16.1193 9.5 17.5 9.5ZM17.5 19.5C18.8807 19.5 20 18.3807 20 17C20 15.6193 18.8807 14.5 17.5 14.5C16.1193 14.5 15 15.6193 15 17C15 18.3807 16.1193 19.5 17.5 19.5Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span className="pl-1.5 text-white text-sm">Help</span>
                  </NavLink>
                </ul>
              </li>
            </ul>
            {/* <div className="bg-purple p-4 pt-0 text-center rounded-md relative help-box">
              <div className="-top-6 relative">
                <span className="text-white mx-auto border border-white/10 shadow-[0_0.75rem_1.5rem_rgba(18,38,63,.03)]  bg-white flex items-center justify-center h-12 w-12 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM13 13.3551V14H11V12.5C11 11.9477 11.4477 11.5 12 11.5C12.8284 11.5 13.5 10.8284 13.5 10C13.5 9.17157 12.8284 8.5 12 8.5C11.2723 8.5 10.6656 9.01823 10.5288 9.70577L8.56731 9.31346C8.88637 7.70919 10.302 6.5 12 6.5C13.933 6.5 15.5 8.067 15.5 10C15.5 11.5855 14.4457 12.9248 13 13.3551Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
              </div>
              <h4 className="text-white text-xl">Help Center</h4>
              <p className="text-white/70 mt-4">
                Looks like there might be a new theme soon.
              </p>
              <div className="mt-5">
                <a href="javascript:;" className="btn-white">
                  Go to help
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
