import Sidebar from "../fragments/Sidebar";
import Header from "../fragments/Header"
import { useState } from "react";

/* eslint-disable react/prop-types */
const Layout = ({children}) => {
    const [showSidebar, setShowSidebar] = useState(false);

    function handleShowSidebar(){
        setShowSidebar(!showSidebar)
    }

    return(
        <>
        <Header onClick={handleShowSidebar}/>
        <div className="h-dvh w-full bg-secondary flex">
            <Sidebar showSidebar={showSidebar}/>
            {children}
        </div>
        </>
    )
}

export default Layout;