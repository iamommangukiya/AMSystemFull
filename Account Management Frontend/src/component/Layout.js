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
      <div className="bg-[#f9fbfd] dark:bg-dark dark:text-darkmuted text-black">
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
                      {pathname === "/dashboard" && "Dashbord"}
                      {pathname === "/dashboard/party" && "Master"}
                      {pathname === "/dashboard/itemmaster" && "Master"}
                      {pathname === "/dashboard/Recipt" && "TransectionMaster"}
                      {pathname === "/dashboard/transectionrecord" &&
                        "TransectionMaster"}
                      {pathname === "/dashboard/Payment" && "TransectionMaster"}
                      {pathname === "/dashboard/biling" && "TransectionMaster"}
                    </li>
                    <li className="text-black font-semibold text-2xl dark:text-white">
                      {pathname === "/dashboard" && "Dashbord"}
                      {pathname === "/dashboard/party" && "PartyMaster"}
                      {pathname === "/dashboard/itemmaster" && "Itemmaster"}
                      {pathname === "/dashboard/Recipt" && "Recipt"}
                      {pathname === "/dashboard/Payment" && "Payment"}
                      {pathname === "/dashboard/transectionrecord" &&
                        "Transectionrecord"}
                          {pathname === "/dashboard/biling" && "Biling"}
                    </li>
                  </ul>
                </nav>
              </div>
              {/* End Breadcrumb  */}

              {/* Start All Card  */}
              <div className="h-screen"><Outlet /></div>
              
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
