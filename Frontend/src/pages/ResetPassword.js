import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { forgotpass, LoginAction, registation } from "../reducer/User_reducer";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import spinner from "../loading.json";

const ResetPassword = () => {
  const [inputs, setInputs] = useState({
    email: "",
  });
  const [err, seterr] = useState("");
  const [errmp, seterrmp] = useState("");

  const dispatch = useDispatch();

  const handelchange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const result = useSelector((state) => state.Loginreducer.forresult);
  const loading = useSelector((state) => state.Loginreducer.loading);
  useEffect(() => {
    if (result.flag === true) {
      naviagte("/revarify", { state: inputs });
    } else if (result.flag === false) {
      seterr(result.message);
    }
    dispatch(LoginAction.clLogindata());
  }, [result]);
  const handelsubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(forgotpass(inputs));
    } catch (error) {
      console.log(error);
    }

    console.log(errmp);
  };

  const naviagte = useNavigate();

  return (
    <>
      {/* <!-- Start Layout --> */}
      <div className="bg-[#f9fbfd] dark:bg-dark text-black min-h-screen relative z-10 ">
        {/* <!-- Start Background Images -->/ */}
        <div className="  bg-white dark:bg-purple h-full bg-bottom bg-cover w-full -z-10 absolute"></div>
        {/* <!-- End Background Images --> */}

        {/* <!-- Start Header --> */}
        <header>
          <nav className="px-4 lg:px-7 max-w-[1440px] mx-auto">
            <div className="items-center">
              <a href="index.html" className="flex items-center">
                <img
                  src="assets/images/logo4.png "
                  height={200}
                  width={200}
                  className="mx-auto dark-logo  dark:hidden pt-5"
                  alt="logo"
                />
              </a>
              {/* <div className="flex items-center lg:order-2"></div> */}
            </div>
          </nav>
        </header>
        {/* <!-- End Header --> */}

        {/* <!-- Start Main Content --> */}
        <div className="min-h-[calc(100vh-134px)] py-4 px-4 sm:px-12 flex justify-center items-center max-w-[1440px] mx-auto">
          <div className="max-w-[550px] flex-none w-full text-black  p-6 sm:p-10 lg:px-10 lg:py-14 rounded-2xl loginform dark:bg-darklight dark:border-darkborder backdrop-blur-xl border backdrop-brightness-110 border-gray-300 shadow-2xl">
            <h1 className="text-3xl text-[#225777] font-semibold mb-2 text-center dark:text-white">
              Reset Password
            </h1>
            <p className="text-center mb-7 dark:text-darkmuted">
              Forgot Your Password!
            </p>

            <form onSubmit={handelsubmit} className="grid grid-cols-1 gap-4">
              <div>
                <input
                  tabIndex={1}
                  type="email"
                  value={inputs.email}
                  placeholder="email"
                  className="form-input bg-transparent bg-[#F9F5F6] border-light backdrop-blur-3xl backdrop-brightness-200 border rounded-md placeholder:text-black focus:border-[#6420AA] shadow-lg"
                  name="email"
                  onChange={handelchange}
                  required
                />
              </div>
              <p className="text-red-600 col-span-2">{err}</p>

              <button
                type="submit"
                className="btn w-full text-lg bg-[#225777] border-0  rounded-md text-white transition-all duration-300 hover:bg-[#173054] hover:border-[#173054]"
              >
                Send OTP
              </button>
            </form>
            <p className="text-center mt-5 dark:text-darkmuted">
              Already a member?{" "}
              <span className="text-black dark:text-white">
                <Link to="/"> Sign In</Link>
              </span>
            </p>
          </div>
        </div>
        {/* <!-- End Main Content --> */}

        {/* <!-- Start Footer --> */}
        {/* <footer className="py-5 text-center text-black max-w-[1440px] mx-auto">
            <div>
              &copy;
              <script>
                var year = new Date(); document.write(year.getFullYear());
              </script>
              Sliced.
              <span>
                Crafted with
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 inline-block relative -mt-[2px]"
                >
                  <path
                    d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"
                    className="fill-purple"
                  ></path>
                </svg>
                by SRBThemes
              </span>
            </div>
          </footer> */}
        {/* <!-- End Footer --> */}
      </div>
      {/* <!-- End Layout --> */}

      {/* <!-- All javascirpt --> */}
      {/* <!-- Alpine js --> */}

      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-300 bg-opacity-50 flex justify-center items-center z-50">
          <Lottie
            animationData={spinner}
            style={{ width: "300px", height: "300px" }}
            loop
            autoplay
          />
        </div>
      )}
    </>
  );
};

export default ResetPassword;
