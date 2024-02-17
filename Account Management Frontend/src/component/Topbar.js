import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";

const Topbar = () => {
  const [comany_name, setcomany_name] = useState();
  const context = useContext(AppContext);
  const {
    fullScreen,
    mode,
    notificationMode,
    toggleSidebar,
    toggleFullScreen,
    toggleMode,
    toggleNotificationMode,
  } = context;
  // const companyName = useSelector((state) => {
  //   const result = state.CompanyReducer.result;
  //   return result && result.data?.[0]?.companyName;
  // });

  useEffect(() => {
    setcomany_name(localStorage.getItem("cmp_name"));
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };
  const handleHide = (event) => {
    const parentLi = event.currentTarget.closest("li");
    parentLi.style.transition = "opacity 300ms ease-in";
    parentLi.style.opacity = "0";

    setTimeout(() => {
      parentLi.style.display = "none";
    }, 300);
  };
  const currentYear = new Date().getFullYear();
  const currentnextYear = new Date().getFullYear() + 1;
  return (
    <>
      <div class="bg-white dark:bg-darklight dark:border-darkborder flex gap-4 lg:z-10 items-center justify-between px-4 h-[60px] border-b border-black/10 detached-topbar relative">
        <div class="flex items-center gap-2 sm:gap-4 flex-1">
          <button
            type="button"
            class="text-black dark:text-white/80"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="h-6 w-6"
            >
              <path
                d="M3 4H21V6H3V4ZM3 11H15V13H3V11ZM3 18H21V20H3V18Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
          {/* <div>
            <select>
              <option>{currentYear}-{currentnextYear}</option>
              <option></option>
            </select>
        
          </div> */}
          {/* <form class="flex-1 hidden min-[420px]:block">
            <div class="relative max-w-[180px] md:max-w-[350px]">
              <input
                type="text"
                id="search"
                class="border-black/10 dark:text-white/80 dark:placeholder:text-white/30 dark:border-darkborder dark:bg-dark dark:focus:border-white/30 focus:border-black/30 placeholder:text-black/50 border text-black text-sm rounded block w-full ps-3 pe-7 h-10 bg-[#f9fbfd] focus:ring-0 focus:outline-0"
                placeholder="Search..."
                required=""
              />

              <button
                type="button"
                class="absolute inset-y-0 right-0 flex items-center pe-2 text-black dark:text-white/80"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="w-4 h-4"
                >
                  <path
                    d="M11 2C15.968 2 20 6.032 20 11C20 15.968 15.968 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2ZM11 18C14.8675 18 18 14.8675 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18ZM19.4853 18.0711L22.3137 20.8995L20.8995 22.3137L18.0711 19.4853L19.4853 18.0711Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
            </div>
          </form> */}
          <div className="justify-start">
            <label>{comany_name}</label>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div class="h-5" x-data="{ fullScreen: false }">
            <button
              className={`text-black dark:text-white/80 ${
                fullScreen ? "hidden" : "block"
              }`}
              onClick={() => {
                toggleFullScreen();
                toggleFullscreen();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="h-5 w-5"
              >
                <path
                  d="M16 3H22V9H20V5H16V3ZM2 3H8V5H4V9H2V3ZM20 19V15H22V21H16V19H20ZM4 19H8V21H2V15H4V19Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
            <button
              className={`text-black dark:text-white/80 ${
                fullScreen ? "block" : "hidden"
              }`}
              onClick={() => {
                toggleFullScreen();
                toggleFullscreen();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="h-5 w-5"
              >
                <path
                  d="M18 7H22V9H16V3H18V7ZM8 9H2V7H6V3H8V9ZM18 17V21H16V15H22V17H18ZM8 15V21H6V17H2V15H8Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <a
              href="javascript:;"
              class="text-black"
              mode="light"
              onClick={() => toggleMode("dark")}
              style={{ display: mode === "dark" ? "none" : "block" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="h-5 w-5"
              >
                <path
                  d="M10 7C10 10.866 13.134 14 17 14C18.9584 14 20.729 13.1957 21.9995 11.8995C22 11.933 22 11.9665 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.0335 2 12.067 2 12.1005 2.00049C10.8043 3.27098 10 5.04157 10 7ZM4 12C4 16.4183 7.58172 20 12 20C15.0583 20 17.7158 18.2839 19.062 15.7621C18.3945 15.9187 17.7035 16 17 16C12.0294 16 8 11.9706 8 7C8 6.29648 8.08133 5.60547 8.2379 4.938C5.71611 6.28423 4 8.9417 4 12Z"
                  fill="currentColor"
                ></path>
              </svg>
            </a>
            <a
              href="javascript:;"
              class="text-black dark:text-white/80"
              mode="dark"
              onClick={() => toggleMode("light")}
              style={{ display: mode === "light" ? "none" : "block" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="w-5 h-5"
              >
                <path
                  d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"
                  fill="currentColor"
                ></path>
              </svg>
            </a>
          </div>
          {/* @click.outside="open = false" */}
          <div class="notification h-5" x-data="dropdown">
            <button
              type="button"
              class="relative text-black dark:text-white/80"
              onClick={toggleNotificationMode}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="w-5 h-5 mx-auto"
              >
                <path
                  d="M5 18H19V11.0314C19 7.14806 15.866 4 12 4C8.13401 4 5 7.14806 5 11.0314V18ZM12 2C16.9706 2 21 6.04348 21 11.0314V20H3V11.0314C3 6.04348 7.02944 2 12 2ZM9.5 21H14.5C14.5 22.3807 13.3807 23.5 12 23.5C10.6193 23.5 9.5 22.3807 9.5 21Z"
                  fill="currentColor"
                ></path>
              </svg>
              <span class="absolute -top-px right-px h-2 w-2 bg-purple border border-white rounded-full"></span>
            </button>
            <div
              className={`noti-area ${notificationMode ? "open" : ""}`}
              style={{ display: notificationMode ? "block" : "none" }}
            >
              <h4 class="text-black dark:text-white/80 px-2 py-2.5 border-b border-black/10 flex items-center gap-2">
                Notification{" "}
                <span class="inline-block bg-purple/10 text-purple text-[10px] p-1 leading-none rounded">
                  32
                </span>
              </h4>
              <ul class="max-h-56 overflow-y-auto ">
                <li>
                  <div className="flex gap-2 cursor-pointer group">
                    <div className="h-9 w-9 flex-none rounded-full overflow-hidden">
                      <img
                        src="assets/images/avatar-1.png"
                        className="object-cover"
                        alt="avatar"
                      />
                    </div>
                    <div className="flex-1 relative">
                      <p className="whitespace-nowrap overflow-hidden text-ellipsis w-[185px] text-black dark:text-white pr-4">
                        Edited the details of Project
                      </p>
                      <p className="text-xs text-black/40 dark:text-darkmuted">
                        5m ago
                      </p>
                      <button
                        type="button"
                        onClick={handleHide}
                        className="absolute top-1 dark:text-white/80 right-0 hidden group-hover:block hover:opacity-80 rotate-0 hover:rotate-180 transition-all duration-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-3.5 h-3.5"
                        >
                          <path
                            d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex gap-2 cursor-pointer group">
                    <div className="h-9 w-9 flex-none rounded-full overflow-hidden">
                      <img
                        src="assets/images/avatar-4.png"
                        className="object-cover"
                        alt="avatar"
                      />
                    </div>
                    <div className="flex-1 relative">
                      <p className="whitespace-nowrap overflow-hidden text-ellipsis w-[185px] text-black dark:text-white pr-4">
                        Released a new version
                      </p>
                      <p className="text-xs text-black/40 dark:text-darkmuted">
                        5m ago
                      </p>
                      <button
                        type="button"
                        onClick={handleHide}
                        className="absolute top-1 dark:text-white/80 right-0 hidden group-hover:block hover:opacity-80 rotate-0 hover:rotate-180 transition-all duration-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-3.5 h-3.5"
                        >
                          <path
                            d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex gap-2 cursor-pointer group">
                    <div className="h-9 w-9 flex-none rounded-full overflow-hidden">
                      <img
                        src="assets/images/avatar-19.png"
                        className="object-cover"
                        alt="avatar"
                      />
                    </div>
                    <div className="flex-1 relative">
                      <p className="whitespace-nowrap overflow-hidden text-ellipsis w-[185px] text-black dark:text-white pr-4">
                        Modified A data in Page
                      </p>
                      <p className="text-xs text-black/40 dark:text-darkmuted">
                        5m ago
                      </p>
                      <button
                        type="button"
                        onClick={handleHide}
                        className="absolute top-1 dark:text-white/80 right-0 hidden group-hover:block hover:opacity-80 rotate-0 hover:rotate-180 transition-all duration-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-3.5 h-3.5"
                        >
                          <path
                            d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex gap-2 cursor-pointer group">
                    <div className="h-9 w-9 flex-none rounded-full overflow-hidden">
                      <img
                        src="assets/images/avatar-24.png"
                        className="object-cover"
                        alt="avatar"
                      />
                    </div>
                    <div className="flex-1 relative">
                      <p className="whitespace-nowrap overflow-hidden text-ellipsis w-[185px] text-black dark:text-white pr-4">
                        Modified A data in Page
                      </p>
                      <p className="text-xs text-black/40 dark:text-darkmuted">
                        5m ago
                      </p>
                      <button
                        type="button"
                        onClick={handleHide}
                        className="absolute top-1 dark:text-white/80 right-0 hidden group-hover:block hover:opacity-80 rotate-0 hover:rotate-180 transition-all duration-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-3.5 h-3.5"
                        >
                          <path
                            d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex gap-2 cursor-pointer group">
                    <div className="h-9 w-9 flex-none rounded-full overflow-hidden">
                      <img
                        src="assets/images/avatar-1.png"
                        className="object-cover"
                        alt="avatar"
                      />
                    </div>
                    <div className="flex-1 relative">
                      <p className="whitespace-nowrap overflow-hidden text-ellipsis w-[185px] text-black dark:text-white pr-4">
                        Edited the details of Project
                      </p>
                      <p className="text-xs text-black/40 dark:text-darkmuted">
                        5m ago
                      </p>
                      <button
                        type="button"
                        onClick={handleHide}
                        className="absolute top-1 dark:text-white/80 right-0 hidden group-hover:block hover:opacity-80 rotate-0 hover:rotate-180 transition-all duration-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-3.5 h-3.5"
                        >
                          <path
                            d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex gap-2 cursor-pointer group">
                    <div className="h-9 w-9 flex-none rounded-full overflow-hidden">
                      <img
                        src="assets/images/avatar-4.png"
                        className="object-cover"
                        alt="avatar"
                      />
                    </div>
                    <div className="flex-1 relative">
                      <p className="whitespace-nowrap overflow-hidden text-ellipsis w-[185px] text-black dark:text-white pr-4">
                        Released a new version
                      </p>
                      <p className="text-xs text-black/40 dark:text-darkmuted">
                        5m ago
                      </p>
                      <button
                        type="button"
                        onClick={handleHide}
                        className="absolute top-1 dark:text-white/80 right-0 hidden group-hover:block hover:opacity-80 rotate-0 hover:rotate-180 transition-all duration-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-3.5 h-3.5"
                        >
                          <path
                            d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex gap-2 cursor-pointer group">
                    <div className="h-9 w-9 flex-none rounded-full overflow-hidden">
                      <img
                        src="assets/images/avatar-13.png"
                        className="object-cover"
                        alt="avatar"
                      />
                    </div>
                    <div className="flex-1 relative">
                      <p className="whitespace-nowrap overflow-hidden text-ellipsis w-[185px] text-black dark:text-white pr-4">
                        Submitted a bug
                      </p>
                      <p className="text-xs text-black/40 dark:text-darkmuted">
                        5m ago
                      </p>
                      <button
                        type="button"
                        onClick={handleHide}
                        className="absolute top-1 dark:text-white/80 right-0 hidden group-hover:block hover:opacity-80 rotate-0 hover:rotate-180 transition-all duration-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-3.5 h-3.5"
                        >
                          <path
                            d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="px-2 py-2.5 border-t border-black/10 dark:border-darkborder">
                <a
                  href="javascript:;"
                  class="text-black dark:text-white dark:hover:text-purple hover:text-purple duration-300"
                >
                  Read More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    class="w-3.5 h-3.5 inline-block relative -top-[1px]"
                  >
                    <path
                      d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
