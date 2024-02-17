import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllComapny,
  fetchDetailsComapny,
} from "../reducer/Company_reducer";
import { useNavigate } from "react-router-dom";

const CompanyFetchacompany = () => {
  const dispatch = useDispatch();

  const [dataFetched, setDataFetched] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAllComapny());
        setDataFetched(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const navigate = useNavigate();

  const response = useSelector(
    (state) => state.CompanyReducer && state.CompanyReducer.result?.data
  );
  console.log(response);

  const handelClick = (isButton) => {
    if (isButton) {
      navigate("/company");
    } else {
      navigate("/dashboard");
    }
  };

  const handleSelectChange = (event) => {
    const selectedCompanyId = event.target.value;

    localStorage.setItem("itemid", selectedCompanyId);

    handelClick(false);
  };

  if (!dataFetched) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-3/5 h-80 mx-80">
      <div className="bg-white border  border-black/10 p-5 rounded dark:bg-darklight dark:border-darkborder md:w-2/3 lg:w-1/2">
        <div className="justify-between flex items-center space-x-2 ">
          <h2 className="text-2xl font-semibold text-black dark:text-white/80 mb-4 px-4 capitalize flex justify-between">
            Select Company
          </h2>
          <button
            type="button"
            onClick={() => handelClick(true)}
            className="btn py-2 mb-4 px-3 text-xl bg-purple border border-purple rounded-md text-white transition-all duration-300 hover:bg-purple/[0.85] hover:border-purple/[0.85]"
          >
            Add Company
          </button>
        </div>

        <form>
          <select className="form-select w-full" onChange={handleSelectChange}>
            <option>Select option</option>

            {response &&
              response.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.companyName}
                </option>
              ))}
          </select>
        </form>
      </div>
    </div>
  );
};

export default CompanyFetchacompany;
