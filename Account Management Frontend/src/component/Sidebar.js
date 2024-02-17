import React, { useContext } from "react";

import { NavLink } from "react-router-dom";
import AppContext from "../context/AppContext";

const Sidebar = () => {
  const context = useContext(AppContext);
  const { activeMenu, activeSubMenu, updateMenu, updateSubMenu } = context;

  return (
    <>
      <nav className="sidebar fixed z-[9999] flex-none w-[240px] border-r dark:bg-darkborder border-black/10 transition-all duration-300 overflow-hidden">
        <div className="bg-white dark:bg-darklight h-full">
          <div className="p-4">
            <a href="index.html" className="main-logo w-full">
              <img
                src="assets/images/logo-dark.svg"
                className="mx-auto dark-logo h-7 logo dark:hidden"
                alt="logo"
              />
              <img
                src="assets/images/logo-light.svg"
                className="mx-auto light-logo h-7 logo hidden dark:block"
                alt="logo"
              />
              <img
                src="assets/images/logo-icon.svg"
                className="logo-icon h-7 mx-auto hidden"
                alt=""
              />
            </a>
          </div>
          <div className="h-[calc(100vh-60px)]  overflow-y-auto overflow-x-hidden px-5 pb-4 space-y-16 detached-menu">
            <ul
              className="relative flex flex-col gap-1 "
              x-data="{ activeMenu: 'apps' }"
            >
              <h2 className="my-2 text-black/50 text-sm dark:text-white/30">
                <span>Menu</span>
              </h2>
             
             
              <li className="menu nav-item">
                <a
                  href="javaScript:;"
                  class={`nav-link group text-black items-center justify-between ${
                    activeMenu === "Master" ? "active" : ""
                  }`}
                  onClick={() => updateMenu("Master")}
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                    >
                      <path
                        d="M7.5 11.5C5.01472 11.5 3 9.48528 3 7C3 4.51472 5.01472 2.5 7.5 2.5C9.98528 2.5 12 4.51472 12 7C12 9.48528 9.98528 11.5 7.5 11.5ZM7.5 21.5C5.01472 21.5 3 19.4853 3 17C3 14.5147 5.01472 12.5 7.5 12.5C9.98528 12.5 12 14.5147 12 17C12 19.4853 9.98528 21.5 7.5 21.5ZM17.5 11.5C15.0147 11.5 13 9.48528 13 7C13 4.51472 15.0147 2.5 17.5 2.5C19.9853 2.5 22 4.51472 22 7C22 9.48528 19.9853 11.5 17.5 11.5ZM17.5 21.5C15.0147 21.5 13 19.4853 13 17C13 14.5147 15.0147 12.5 17.5 12.5C19.9853 12.5 22 14.5147 22 17C22 19.4853 19.9853 21.5 17.5 21.5ZM7.5 9.5C8.88071 9.5 10 8.38071 10 7C10 5.61929 8.88071 4.5 7.5 4.5C6.11929 4.5 5 5.61929 5 7C5 8.38071 6.11929 9.5 7.5 9.5ZM7.5 19.5C8.88071 19.5 10 18.3807 10 17C10 15.6193 8.88071 14.5 7.5 14.5C6.11929 14.5 5 15.6193 5 17C5 18.3807 6.11929 19.5 7.5 19.5ZM17.5 9.5C18.8807 9.5 20 8.38071 20 7C20 5.61929 18.8807 4.5 17.5 4.5C16.1193 4.5 15 5.61929 15 7C15 8.38071 16.1193 9.5 17.5 9.5ZM17.5 19.5C18.8807 19.5 20 18.3807 20 17C20 15.6193 18.8807 14.5 17.5 14.5C16.1193 14.5 15 15.6193 15 17C15 18.3807 16.1193 19.5 17.5 19.5Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span className="pl-1.5">Master</span>
                  </div>

                  <div
                    class={`w-4 h-4 flex items-center justify-center dropdown-icon ${
                      activeMenu === "Master" ? "!rotate-180" : ""
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-6 h-6"
                    >
                      <path
                        d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </a>
                <ul
                  x-cloak
                  x-show={`${activeMenu === "Master"}`}
                  x-collapse
                  className="sub-menu flex flex-col gap-1 text-black dark:text-white/60"
                >
                  <li>
                    <NavLink to="/dashboard/party">Party Master</NavLink>
                  </li>
                  <li>
                    {/* <a href="javascript:;">
                      Projects{" "}
                      <span className="bg-danger/10 ms-3 text-danger text-xs rounded px-2 inline-block py-1 leading-none">
                        Soon
                      </span>
                    </a> */}
                    <NavLink to="/dashboard/itemmaster">Items Master</NavLink>
                  </li>
                </ul>
              </li>
              <li className="menu nav-item">
                <a
                  href="javaScript:;"
                  class={`nav-link group text-black items-center justify-between ${
                    activeMenu === "Master" ? "active" : ""
                  }`}
                  onClick={() => updateMenu("TrasctionMaster")}
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                    >
                      <path
                        d="M7.5 11.5C5.01472 11.5 3 9.48528 3 7C3 4.51472 5.01472 2.5 7.5 2.5C9.98528 2.5 12 4.51472 12 7C12 9.48528 9.98528 11.5 7.5 11.5ZM7.5 21.5C5.01472 21.5 3 19.4853 3 17C3 14.5147 5.01472 12.5 7.5 12.5C9.98528 12.5 12 14.5147 12 17C12 19.4853 9.98528 21.5 7.5 21.5ZM17.5 11.5C15.0147 11.5 13 9.48528 13 7C13 4.51472 15.0147 2.5 17.5 2.5C19.9853 2.5 22 4.51472 22 7C22 9.48528 19.9853 11.5 17.5 11.5ZM17.5 21.5C15.0147 21.5 13 19.4853 13 17C13 14.5147 15.0147 12.5 17.5 12.5C19.9853 12.5 22 14.5147 22 17C22 19.4853 19.9853 21.5 17.5 21.5ZM7.5 9.5C8.88071 9.5 10 8.38071 10 7C10 5.61929 8.88071 4.5 7.5 4.5C6.11929 4.5 5 5.61929 5 7C5 8.38071 6.11929 9.5 7.5 9.5ZM7.5 19.5C8.88071 19.5 10 18.3807 10 17C10 15.6193 8.88071 14.5 7.5 14.5C6.11929 14.5 5 15.6193 5 17C5 18.3807 6.11929 19.5 7.5 19.5ZM17.5 9.5C18.8807 9.5 20 8.38071 20 7C20 5.61929 18.8807 4.5 17.5 4.5C16.1193 4.5 15 5.61929 15 7C15 8.38071 16.1193 9.5 17.5 9.5ZM17.5 19.5C18.8807 19.5 20 18.3807 20 17C20 15.6193 18.8807 14.5 17.5 14.5C16.1193 14.5 15 15.6193 15 17C15 18.3807 16.1193 19.5 17.5 19.5Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span className="pl-1.5">TrasctionMaster</span>
                  </div>

                  <div
                    class={`w-4 h-4 flex items-center justify-center dropdown-icon ${
                      activeMenu === "TrasctionMaster" ? "!rotate-180" : ""
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-6 h-6"
                    >
                      <path
                        d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </a>
                <ul
                  x-cloak
                  x-show={`${activeMenu === "TrasctionMaster"}`}
                  x-collapse
                  className="sub-menu flex flex-col gap-1 text-black dark:text-white/60"
                >
                  <li>
                    <NavLink to="/dashboard/Recipt">Recipt</NavLink>
                  </li>

                  <li>
                    {/* <a href="javascript:;">
                      Projects{" "}
                      <span className="bg-danger/10 ms-3 text-danger text-xs rounded px-2 inline-block py-1 leading-none">
                        Soon
                      </span>
                    </a> */}
                    <NavLink to="/dashboard/Payment">Payment</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/transectionrecord">
                      transectionrecord
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/PurchaseBill">
                    Purchase Billing
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/SaleBill">
                    Sale Billing
                    </NavLink>
                  </li>
                  <li>
                    <a href="javascript:;">
                      eCommerce{" "}
                      <span className="bg-danger/10 ms-3 text-danger text-xs rounded px-2 inline-block py-1 leading-none">
                        Soon
                      </span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="bg-purple p-4 pt-0 text-center rounded-md relative help-box">
              <div className="-top-6 relative">
                <span className="text-black mx-auto border border-black/10 shadow-[0_0.75rem_1.5rem_rgba(18,38,63,.03)]  bg-white flex items-center justify-center h-12 w-12 rounded-full">
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
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
