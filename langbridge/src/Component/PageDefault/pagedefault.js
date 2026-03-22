import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/sidebar";
import SideBarRight from "../SideBarRight/sidebarright";
import { ImProfile } from "react-icons/im";
import "./pageDefault.css"
import { useCallback, useEffect, useState } from "react";


function PageDefault(){
    const [statusProfile,setStatusProfile] = useState(document.cookie ? true : false)
    const [statusSignIn,setStatusSignIn] = useState(document.cookie ? true : false)

    const [reload,setReload] = useState(false)

    const openProfile = useCallback(() => {
        setStatusProfile(true)
    },[statusProfile])

    useEffect(() => {
        if(document.cookie){
            fetch(`http://localhost:3000/user?${document.cookie}`)
                .then(res => res.json())
                .then(data => {
                    window.localStorage.setItem("user",JSON.stringify(data[0]))
                })
        }
    },[document.cookie])

    return (
        <>
            <div className="pageDefault container-fluid text-align-start">
                <div className="d-flex over-flow-hidden relative">
                    <SideBar setStatusSignIn = {setStatusSignIn} />
                    <div className="main">
                        <Outlet context={{ statusSignIn, setStatusSignIn,reload,setReload }}/>
                    </div>
                    <button className = {`openProfile font-20 bg-white border-none px-0 py-0 relative cursor-pointer ${statusProfile === true ? "d-none" : ""}`} onClick={openProfile}><ImProfile / ></button>
                    <SideBarRight statusProfile = {statusProfile} setStatusProfile = {setStatusProfile} statusSignIn = {statusSignIn} setStatusSignIn = {setStatusSignIn} reload = {reload} setReload = {setReload}/>
                </div >
            </div>
        </>
    )
}
export default PageDefault;