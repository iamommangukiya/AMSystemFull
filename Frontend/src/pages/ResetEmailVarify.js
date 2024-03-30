import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginAction, REverifyOtp } from "../reducer/User_reducer";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Lottie from "lottie-react";
import spinner from "../loading.json";

function ResetEmailVarify() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const inputs = location.state;
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // State variable to store the OTP
  const flag = useSelector((state) => state.Loginreducer.REverifyOtp?.flag);
  const loading = useSelector((state) => state.Loginreducer.loading);
  const otpInputs = useRef([]);
  // Function to handle OTP input change
  useEffect(() => {
    if (flag == true) {
      toast.success("otp verified successfully", "sucess");
      dispatch(LoginAction.clearALLlogin());
      setTimeout(() => {
        navigate("/REpass", { state: { data: inputs } });
      }, 3000); // Navigate to "/" after 3 seconds
      dispatch(LoginAction.clearloading());
    } else if (flag == false) {
      toast.dark("Otp code is wrong", "DANGER");
      dispatch(LoginAction.clearloading());
    }
  }, [flag]);
  // Function to handle OTP input change
  const handleOtpChange = (index, value) => {
    // Create a copy of the OTP array
    let newOtp = [...otp];
    // Update the OTP array at the specified index
    newOtp[index] = value;
    // Update the state with the new OTP array
    setOtp(newOtp);

    // If the value is not empty and there exists another input field next to it, move focus to that field
    if (value !== "" && index < otp.length - 1) {
      otpInputs.current[index + 1].focus();
    }
  };

  // Function to handle key down event in OTP input
  const handleKeyDown = (index, e) => {
    // If the backspace key is pressed and the current input is empty, move focus to the previous input field
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      otpInputs.current[index - 1].focus();
    }
  };

  const handleVarify = (e) => {
    e.preventDefault();
    dispatch(REverifyOtp({ ...inputs, otp: otp.join("") }));
  };

  return (
    <div>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email {inputs.email}</p>
              </div>
            </div>

            <div>
              <form onSubmit={handleVarify}>
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    {otp.map((_, index) => (
                      <div className="w-16 h-16" key={index}>
                        <input
                          ref={(el) => (otpInputs.current[index] = el)} // Set the ref for the input field
                          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          value={otp[index]}
                          maxLength={1}
                          onChange={(e) =>
                            handleOtpChange(index, e.target.value)
                          }
                          onKeyDown={(e) => handleKeyDown(index, e)}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col space-y-5">
                    <div>
                      <button
                        className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                        type="submit"
                      >
                        Verify Account
                      </button>
                    </div>

                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't receive code?</p>{" "}
                      {/* <a
                        className="flex flex-row items-center text-blue-600"
                        href="http://"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Resend
                      </a> */}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
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
    </div>
  );
}

export default ResetEmailVarify;
