import React, { useState } from "react";
import Appcontext from "./AppContex";
const AppComponent = (props) => {
  const [sidebar, setSidebar] = useState(true);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [activeSubMenu, setActiveSubMenu] = useState("default");
  const [mode, setMode] = useState("light");
  const [fullScreen, setFullScreen] = useState(false);
  const [notificationMode, setNotificationMode] = useState(false);

  const updateMenu = (menuName) => {
    if (menuName === activeMenu) {
      setActiveMenu("");
    } else {
      setActiveMenu(menuName);
    }
  };
  const toggleMode = (mode) => {
    setMode(mode);
  };
  const updateSubMenu = (subName) => {
    setActiveSubMenu(subName);
  };

  return (
    <Appcontext.Provider
      value={{
        sidebar,
        activeMenu,
        activeSubMenu,
        fullScreen,
        mode,

        updateMenu,
        updateSubMenu,
        toggleMode,
        notificationMode,

        toggleSidebar: () => setSidebar(!sidebar),
        toggleFullScreen: () => setFullScreen(!fullScreen),
        toggleNotificationMode: () => setNotificationMode(!notificationMode),
      }}
    >
      {props.children}
    </Appcontext.Provider>
  );
};

export default AppComponent;
