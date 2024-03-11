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
  // console.log(response);

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
    <div className="flex items-center justify-center min-h-screen h-80 relative z-10">
       <div className=" bg-black dark:bg-purple min-h-[220px] sm:min-h-[70vh] bg-bottom w-full -z-10 absolute"  style={{ backgroundImage: 'url("../assets/images/bg-main.png")' }}></div>
      <div className=" p-5 rounded dark:bg-darklight dark:border-darkborder md:w-2/3 lg:w-1/2 backdrop-blur-sm overflow-hidden bg-[#ffffff14]  border-2 border-[#ffffff14]">
        <div className="justify-between flex items-center space-x-2 ">
          <h2 className="text-3xl font-semibold text-white dark:text-white/80 mb-4 px-4 capitalize flex justify-between">
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
