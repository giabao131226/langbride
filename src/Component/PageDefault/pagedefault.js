import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/sidebar";
import SideBarRight from "../SideBarRight/sidebarright";
import { ImProfile } from "react-icons/im";
import "./pageDefault.css"
import { useCallback, useEffect, useState } from "react";


function PageDefault(){
    const [statusProfile,setStatusProfile] = useState(true)

    const openProfile = useCallback(() => {
        setStatusProfile(true)
    },[statusProfile])

    return (
        <>
            <div className="container-fluid h-screen text-align-start">
                <div className="d-flex over-flow-hidden relative">
                    <SideBar/>
                    <div className="main d-flex">
                        <Outlet />
                    </div>
                    <button className = {` openProfile font-20 bg-white border-none px-0 py-0 relative cursor-pointer ${statusProfile === true ? "d-none" : ""}`} onClick={openProfile}><ImProfile / ></button>
                    <SideBarRight statusProfile = {statusProfile} setStatusProfile = {setStatusProfile}/>
                </div >
            </div>
        </>
    )
}
export default PageDefault;