import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/sidebar";
import SideBarRight from "../SideBarRight/sidebarright";
import { ImProfile } from "react-icons/im";
import "./pageDefault.css"
import { useCallback, useEffect, useState } from "react";


function PageDefault(){
    const [statusProfile,setStatusProfile] = useState(document.cookie ? true : false)
    const [toDoList,setToDoList] = useState({})

    const openProfile = useCallback(() => {
        setStatusProfile(true)
    },[statusProfile])

    useEffect(() => {
        if(document.cookie){
            console.log(document.cookie)
            console.log(`http://localhost:3000/user?${document.cookie}`)
            fetch(`http://localhost:3000/user?${document.cookie}`)
                .then(res => res.json())
                .then(data => {
                    window.localStorage.setItem("user",JSON.stringify(data[0]))
                })
        }
    })

    useEffect(() => {
        if(document.cookie){
            const account = window.localStorage.getItem("user")
            console.log(account)
            fetch(`http://localhost:3000/toDoList?ownerID=1`)
        }
    })

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