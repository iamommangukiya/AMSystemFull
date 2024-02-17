import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./pages/SingUp";
import Login from "./pages/Login";
import "sweetalert2/dist/sweetalert2.min.css";
import Company from "./pages/Company";
import CompanyFetchacompany from "./pages/CompanyAllFetch";
import CompanyDetail from "./pages/CompanyDetail";
import Topbar from "./component/Topbar";
import Sidebar from "./component/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./component/Layout";
import AppContext from "./context/AppContext";
import ItemMaster from "./pages/ItemMaster";
import PartyRecord from "./component/PartyRecord";
import ReciveAmount from "./component/ReciveAmountRecords";
import Trasection_Records from "./component/Transection_Records";
import PurchaseBill from "./pages/PurchaseBill";
import SaleBilling from "./pages/SaleBilling";

const App = () => {
  const context = useContext(AppContext);

  const { sidebar, fullScreen, mode, notificationMode } = context;

  useEffect(() => {
    const body = document.body;
    //const root = document.getElementById('root');

    // Remove existing classes
    body.classList.remove(
      "font-cerebri",
      "antialiased",
      "relative",
      "text-black",
      "dark:text-white",
      "text-sm",
      "font-normal",
      "overflow-x-hidden",
      "vertical",
      "toggle-sidebar",
      "full",
      "light",
      "dark"
    );

    // Add classes based on states
    body.classList.add(
      "font-cerebri",
      "antialiased",
      "relative",
      "text-black",
      "dark:text-white",
      "text-sm",
      "font-normal",
      "overflow-x-hidden",
      "vertical"
    );
    if (!sidebar) {
      body.classList.add("toggle-sidebar");
    }
    if (fullScreen) {
      body.classList.add("full");
    }

    if (mode === "light") {
      body.classList.add("light");
    }
    if (mode === "dark") {
      body.classList.add("dark");
    }
    // Update the data attributes for later access if needed
    // root.setAttribute('data-sidebar', sidebar);
    // root.setAttribute('data-fullscreen', fullScreen);
  }, [sidebar, fullScreen, mode, notificationMode]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/nav" element={<Topbar />} />
        <Route path="/fetchcompany" element={<CompanyFetchacompany />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/company" element={<Company />} />

        <Route path="/companydetails" element={<CompanyDetail />} />
        {/* <Route path="/record" element={<Party_Record></Party_Record>} /> */}
        <Route path="/dashboard" element={<Layout />}>
          <Route path="" element={<CompanyDetail></CompanyDetail>}></Route>
          <Route path="party" element={<PartyRecord></PartyRecord>}></Route>
          <Route path="itemmaster" element={<ItemMaster></ItemMaster>}></Route>
          <Route
            path="PurchaseBill"
            element={<PurchaseBill></PurchaseBill>}
          ></Route>
          <Route path="saleBill" element={<SaleBilling></SaleBilling>}></Route>
          <Route
            path="transectionrecord"
            element={<Trasection_Records />}
          ></Route>
          <Route
            path="Recipt"
            element={<ReciveAmount transectionType={"credit"}></ReciveAmount>}
          ></Route>
          <Route
            path="Payment"
            element={<ReciveAmount transectionType={"debit"}></ReciveAmount>}
          ></Route>
        </Route>
        <Route path="/sidebar" element={<Sidebar />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
