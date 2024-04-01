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
                <a href="#" className="flex items-center">
                <img
                  src="assets/images/dashboard.svg"
                  height={20}
                  width={20}
                  className="mx-auto dark-logo dark:hidden"
                  alt="logo"
                />
              </a>
                  <span className="text-white text-sm">Dashboard</span>
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
                  <a href="#" className="flex items-center">
                <img
                  src="assets/images/party.svg"
                  height={20}
                  width={20}
                  className="mx-auto dark-logo dark:hidden"
                  alt="logo"
                />
              </a>
                    <span className="pl-1.5 text-white text-sm">
                      Parties & Inventories
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
                  <a href="#" className="flex items-center">
                <img
                  src="assets/images/transection.svg"
                  height={20}
                  width={20}
                  className="mx-auto dark-logo dark:hidden"
                  alt="logo"
                />
              </a>
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
                  <a href="#" className="flex items-center">
                <img
                  src="assets/images/report.svg"
                  height={20}
                  width={20}
                  className="mx-auto dark-logo dark:hidden"
                  alt="logo"
                />
              </a>
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
                  <a href="#" className="flex items-center">
                <img
                  src="assets/images/help.svg"
                  height={20}
                  width={20}
                  className="mx-auto dark-logo dark:hidden"
                  alt="logo"
                />
              </a>
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
