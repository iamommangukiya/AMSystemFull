import React, { useContext } from "react";

import Sidebar from "../component/Sidebar";
import Topbar from "../component/Topbar";
import Footer from "../component/Footer";

import { Outlet, useLocation } from "react-router";

import AppContext from "../context/AppContext";

const Layout = () => {
  const context = useContext(AppContext);
  const { sidebar, toggleSidebar } = context;
  const { pathname } = useLocation();

  return (
    <>
      {/* <body x-data="main" className={`font-cerebri antialiased relative text-black dark:text-white text-sm font-normal overflow-x-hidden vertical ${sidebar ? "" : "toggle-sidebar" } ${fullscreen ? "full" : "" }`}> */}

      {/* Start Layout */}
      <div className="bg-[#F2F4F6] dark:bg-dark dark:text-darkmuted text-black">
        {/* Start detached bg */}
        <div
          className=" bg-black min-h-[220px] sm:min-h-[250px] bg-bottom fixed hidden w-full -z-50 detached-img"
          style={{ backgroundImage: 'url("../assets/images/bg-main.png")' }}
        ></div>
        {/* End detached bg */}

        {/* Start Menu Sidebar Olverlay */}
        <div
          x-cloak
          className={`fixed inset-0 bg-black/60 dark:bg-dark/90 z-[999] lg:hidden ${
            sidebar ? "" : "hidden"
          }`}
          onClick={toggleSidebar}
        ></div>
        {/* End Menu Sidebar Olverlay */}

        {/* Start Main Content */}
        <div className="main-container flex mx-auto">
          {/* Start Sidebar */}
          <Sidebar />
          {/* End sidebar */}

          {/* Start Content Area */}
          <div className="main-content flex-1">
            {/* Start Topbar */}
            <Topbar />
            {/* End Topbar */}

            {/* Start Content  */}
            <div className="h-[calc(100vh-60px)]  relative overflow-y-auto  overflow-x-hidden p-4 space-y-4 detached-content">
              {/* Start Breadcrumb  */}
              <div>
                <nav className="w-full">
                  <ul className="space-y-2 detached-breadcrumb">
                    <li className="text-xs dark:text-white/80">
                      {pathname === "/dashboard" && "Dashboard"}
                      {pathname === "/dashboard/party" && "Master"}
                      {pathname === "/dashboard/itemmaster" && "Master"}
                      {pathname === "/dashboard/Recipt" && "TransectionMaster"}
                      {pathname === "/dashboard/transectionrecord" &&
                        "TransectionMaster"}

                      {pathname === "/dashboard/Payment" && "TransectionMaster"}
                      {pathname === "/dashboard/PurchaseBill" &&
                        "TransectionMaster"}
                      {pathname === "/dashboard/biling" && "TransectionMaster"}
                      {pathname === "/dashboard/SaleBill" &&
                        "TransectionMaster"}
                      {pathname === "/dashboard/deliveryChallan" &&
                        "TransectionMaster"}
                      {pathname === "/dashboard/quotation" &&
                        "TransectionMaster"}
                      {pathname === "/dashboard/Purchase" && "Report"}
                      {pathname === "/dashboard/Salse" && "Report"}
                      {pathname === "/dashboard/gst" && "Report"}
                      {pathname === "/dashboard/gst2" && "Report"}
                      {pathname === "/dashboard/balancesheet" && "Report"}
                      {pathname === "/dashboard/AccountPay" && "Report"}
                      {pathname === "/dashboard/Accountrec" && "Report"}
                    </li>
                    <li className="text-black font-semibold text-2xl dark:text-white">
                      {pathname === "/dashboard" && "Dashboard"}
                      {pathname === "/dashboard/party" && "Clients"}
                      {pathname === "/dashboard/itemmaster" && "Inventories"}
                      {pathname === "/dashboard/Recipt" && "Debit Transaction"}
                      {pathname === "/dashboard/Payment" && "Credit Transaction"}
                      {pathname === "/dashboard/PurchaseBill" &&
                        "Purchase Bill"}
                      {pathname === "/dashboard/transectionrecord" &&
                        "Transactions"}  
                      {pathname === "/dashboard/SaleBill" && "Sales Bill"}

                      {pathname === "/dashboard/deliveryChallan" &&
                        "Delivery Challan"}
                      {pathname === "/dashboard/quotation" && "Quotation"}
                      {pathname === "/dashboard/Purchase" && "Purchase"}
                      {pathname === "/dashboard/Salse" && "Sales"}
                      {pathname === "/dashboard/gst" && "GST Sales"}
                      {pathname === "/dashboard/gst2" && "GST Purchase"}
                      {pathname === "/dashboard/balancesheet" && "Balance sheet"}
                      {pathname === "/dashboard/AccountPay" &&
                        "Account Payable"}
                      {pathname === "/dashboard/Accountrec" &&
                        "Account Receivable"}
                      {pathname === "/dashboard/help" && "Help"}
                    </li>
                  </ul>
                </nav>
              </div>
              {/* End Breadcrumb  */}

              {/* Start All Card  */}
              <div className="h-screen">
                <Outlet />
              </div>

              {/* End All Card  */}

              {/* Start Footer  */}
              <Footer />
              {/* End Footer  */}
            </div>
            {/* End Content  */}
          </div>
          {/* End Content Area */}
        </div>
      </div>
      {/* End Layout */}
    </>
  );
};

export default Layout;
