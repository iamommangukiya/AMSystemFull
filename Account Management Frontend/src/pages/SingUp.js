import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { LoginAction, registation } from "../reducer/User_reducer";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import spinner from "../loading.json";

const Registration = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    mobile: "",
  });
  const [err, seterr] = useState("");
  const [errmp, seterrmp] = useState("");

  const dispatch = useDispatch();

  const handelchange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const result = useSelector((state) => state.Loginreducer.result);
  const loading = useSelector((state) => state.Loginreducer.loading);
  useEffect(() => {
    if (result.flag === true) {
      naviagte("/varify", { state: inputs });
    } else if (result.flag === false) {
      seterr(result.message);
    }
    dispatch(LoginAction.clLogindata());
  }, [result]);
  const handelsubmit = async (e) => {
    e.preventDefault();
    if (inputs.password?.length < 6) {
      seterr("Password must be at least 6 characters long.");
    }
    if (!/^\d{10}$/.test(inputs.mobile)) {
      seterrmp("Please enter a 10-digit mobile number.");
    } else {
      try {
        dispatch(registation(inputs));
      } catch (error) {
        console.log(error);
      }
    }
    console.log(errmp);
  };

  const naviagte = useNavigate();

  return (
    <>
      {/* <!-- Start Layout --> */}
      <div className="bg-[#f9fbfd] dark:bg-dark text-black min-h-screen relative z-10">
        {/* <!-- Start Background Images -->/ */}
        <div
          className="  bg-black dark:bg-purple h-full bg-bottom bg-cover w-full -z-10 absolute"
          style={{ backgroundImage: 'url("../assets/images/images-5.jpg")' }}
        ></div>
        {/* <!-- End Background Images --> */}

        {/* <!-- Start Header --> */}
        <header>
          <nav className="px-4 lg:px-7 py-4 max-w-[1440px] mx-auto">
            <div className="flex flex-wrap justify-between items-center">
              <a href="index.html" className="flex items-center">
                {/* <img
                  src="assets/images/logo-light.svg"
                  className="mx-auto dark-logo h-7 dark:hidden"
                  alt="logo"
                /> */}
                <img
                  src="assets/images/light.svg"
                  className="mx-auto light-logo h-7 hidden dark:block"
                  alt="logo"
                />
              </a>
            </div>
          </nav>
        </header>
        {/* <!-- End Header --> */}

        {/* <!-- Start Main Content --> */}
        <div className="min-h-[calc(100vh-134px)] py-4 px-4 sm:px-12 flex justify-center items-center max-w-[1440px] mx-auto">
          <div className="max-w-[550px] flex-none w-full p-6 text-white sm:p-10 lg:px-10 lg:py-14 rounded-2xl dark:bg-darklight dark:border-darkborder backdrop-blur-xl border-2 backdrop-brightness-110 border-gray-300">
            <h1 className="text-3xl font-semibold mb-2 text-center dark:text-white">
              Sign Up
            </h1>
            <p className="text-center mb-7 dark:text-darkmuted">
              Enter your email and password to sign up!
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-7">
              <a
                href="javaScript:;"
                className="flex flex-1 items-center gap-1 btn border border-light dark:text-white dark:hover:text-black rounded-md text-black transition-all duration-300 hover:bg-light hover:text-black"
              >
                <div className="w-8 h-8 flex items-center justify-center flex-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <path
                      fill="currentColor"
                      d="M12 11H20.5329C20.5769 11.3847 20.6 11.7792 20.6 12.1837C20.6 14.9184 19.6204 17.2204 17.9224 18.7837C16.4367 20.1551 14.404 20.9592 11.9796 20.9592C8.46933 20.9592 5.43266 18.947 3.9551 16.0123C3.34695 14.8 3 13.4286 3 11.9796C3 10.5306 3.34695 9.1592 3.9551 7.94698C5.43266 5.01226 8.46933 3 11.9796 3C14.4 3 16.4326 3.88983 17.9877 5.33878L16.5255 6.80101C15.3682 5.68153 13.8028 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.5265 19 18.1443 16.3923 18.577 13H12V11Z"
                    ></path>
                  </svg>
                </div>
                <p className="whitespace-nowrap">Sign up with Google</p>
              </a>
              <a
                href="javaScript:;"
                className="flex flex-1 items-center gap-1 btn border border-light dark:text-white dark:hover:text-black rounded-md text-black transition-all duration-300 hover:bg-light hover:text-black"
              >
                <div className="w-8 h-8 flex items-center justify-center flex-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <path
                      fill="currentColor"
                      d="M15.778 8.20805C15.3053 8.17122 14.7974 8.28446 14.0197 8.58079C14.085 8.55589 13.2775 8.87185 13.0511 8.95089C12.5494 9.12605 12.1364 9.2221 11.6734 9.2221C11.2151 9.2221 10.7925 9.13054 10.3078 8.96695C10.1524 8.91453 9.99616 8.85652 9.80283 8.78102C9.71993 8.74864 9.41997 8.62959 9.3544 8.60391C8.70626 8.35008 8.34154 8.25446 8.03885 8.26194C6.88626 8.27662 5.79557 8.94222 5.16246 10.0443C3.87037 12.2876 4.58583 16.3429 6.47459 19.0751C7.4802 20.5191 8.03062 21.0351 8.25199 21.028C8.4743 21.0184 8.63777 20.9714 9.03567 20.8027C9.11485 20.769 9.11485 20.769 9.202 20.7318C10.2077 20.3033 10.9118 20.1141 11.9734 20.1141C12.9944 20.1141 13.6763 20.2999 14.6416 20.716C14.7302 20.7543 14.7302 20.7543 14.8097 20.7885C15.2074 20.9589 15.3509 20.9963 15.6016 20.9903C15.9591 20.9847 16.4003 20.5727 17.3791 19.1363C17.6471 18.7448 17.884 18.3334 18.0895 17.9169C17.9573 17.8078 17.826 17.6918 17.6975 17.5694C16.4086 16.3409 15.6114 14.6846 15.5895 12.6392C15.5756 11.0188 16.1057 9.61499 16.999 8.4581C16.6293 8.31432 16.2216 8.23817 15.778 8.20805ZM15.9334 6.2141C16.6414 6.2621 18.6694 6.4781 19.9894 8.4101C19.8814 8.4701 17.5654 9.8141 17.5894 12.6221C17.6254 15.9821 20.5294 17.0981 20.5654 17.1101C20.5414 17.1941 20.0974 18.7061 19.0294 20.2661C18.1054 21.6221 17.1454 22.9661 15.6334 22.9901C14.1454 23.0261 13.6654 22.1141 11.9734 22.1141C10.2694 22.1141 9.74138 22.9661 8.33738 23.0261C6.87338 23.0741 5.76938 21.5621 4.83338 20.2181C2.92538 17.4581 1.47338 12.4421 3.42938 9.0461C4.40138 7.3541 6.12938 6.2861 8.01338 6.2621C9.44138 6.2261 10.7974 7.2221 11.6734 7.2221C12.5374 7.2221 14.0854 6.0701 15.9334 6.2141ZM14.7934 4.3901C14.0134 5.3261 12.7414 6.0581 11.5054 5.9621C11.3374 4.6901 11.9614 3.3581 12.6814 2.5301C13.4854 1.5941 14.8294 0.898098 15.9454 0.850098C16.0894 2.1461 15.5734 3.4541 14.7934 4.3901Z"
                    ></path>
                  </svg>
                </div>
                <p className="whitespace-nowrap">Sign up with Apple</p>
              </a>
            </div>
            <div className="flex items-center mb-7">
              <div className="w-full h-[2px] bg-white dark:bg-darkborder"></div>
              <div className="px-5  whitespace-nowrap capitalize dark:text-darkmuted">
                Or with Email
              </div>
              <div className="w-full h-[2px] bg-white dark:bg-darkborder"></div>
            </div>
            <form
              onSubmit={handelsubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div>
                <input
                  tabIndex={1}
                  type="text"
                  value={inputs.firstName}
                  placeholder="First Name"
                  className="form-input"
                  name="firstName"
                  onChange={handelchange}
                  required
                />
              </div>
              <div>
                <input
                  tabIndex={2}
                  type="text"
                  value={inputs.lastName}
                  placeholder="Last Name"
                  className="form-input"
                  name="lastName"
                  onChange={handelchange}
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <input
                  tabIndex={3}
                  type="email"
                  value={inputs.email}
                  placeholder="Email"
                  className="form-input"
                  name="email"
                  onChange={handelchange}
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <input
                  tabIndex={5}
                  type="text"
                  value={inputs.mobile}
                  placeholder="Mobile Number"
                  className="form-input"
                  name="mobile"
                  onChange={handelchange}
                  required
                />
              </div>
              <p className="text-red-600 col-span-2">{errmp}</p>
              <div className="sm:col-span-2">
                <input
                  tabIndex={4}
                  type="password"
                  value={inputs.password}
                  placeholder="Password"
                  name="password"
                  className="form-input"
                  onChange={handelchange}
                  required
                />
              </div>
              <p className="text-red-600 col-span-2">{err}</p>

              <button
                type="submit"
                className="btn sm:col-span-2 w-full py-3.5 text-base bg-[#3b82f680] border border-purple rounded-md text-white transition-all duration-300 hover:bg-[#5881c280] hover:border-purple/[0.85]"
              >
                Create an account
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

export default Registration;
