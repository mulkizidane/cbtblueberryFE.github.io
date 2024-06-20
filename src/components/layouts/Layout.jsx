import Sidebar from "../fragments/Sidebar";
import Header from "../fragments/Header"
import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { useParams } from "react-router-dom";

/* eslint-disable react/prop-types */
const Layout = ({children}) => {
    const [showSidebar, setShowSidebar] = useState(false);
    const {userId} = useParams()

    function handleShowSidebar(){
        setShowSidebar(!showSidebar)
    }

    return(
        <>
        <Header onClick={handleShowSidebar}/>
        <div className={`h-dvh z-10 w-full transition-all duration-500 ${showSidebar ? 'pl-52' : ''} bg-secondary flex`}>
        {children}
        </div>
        {
            userId == 'admin'
            ?
            <AdminSidebar showSidebar={showSidebar}/>
            :
            <Sidebar showSidebar={showSidebar}/>
        }
        </>
    )
}

export default Layout;