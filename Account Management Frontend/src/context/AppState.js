import React, { useState } from "react";
import AppContext from "./AppContext";

const AppState = (props) => {
    const [sidebar, setSidebar] = useState(true);
    const [activeMenu, setActiveMenu] = useState("dashboard");
    const [activeSubMenu, setActiveSubMenu] = useState("default");
    const [mode, setMode] = useState("light");
    const [fullScreen, setFullScreen] = useState(false);
    const [notificationMode, setNotificationMode] = useState(false);

    const updateMenu = (menuName) => {
        if(menuName ===  activeMenu)
        {
            setActiveMenu("")    
        }
        else{
            setActiveMenu(menuName)
        }
    }
    const toggleMode = (mode) => {
            setMode(mode)    
    }
    const updateSubMenu = (subName) => {
        setActiveSubMenu(subName)
        
    }

    return (
        <AppContext.Provider value={{

            sidebar, activeMenu, activeSubMenu, fullScreen, mode,

            updateMenu, updateSubMenu,toggleMode,notificationMode,

            toggleSidebar: () => setSidebar(!sidebar),
            toggleFullScreen: () => setFullScreen(!fullScreen),
            toggleNotificationMode: () => setNotificationMode(!notificationMode)
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppState