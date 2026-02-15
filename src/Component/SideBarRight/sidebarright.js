
import { use, useCallback, useEffect, useState } from "react";
import FormSignIn from "../FormSignIn/formSignIn";
// May cai Component Ben Ngoai
import Profile from "../Profile/profile";
import { Link } from "react-router-dom"
import { Button, Carousel, Dropdown, Space, Modal, Form, Input,message } from 'antd'
// CSS
import "./sidebarright.css"
// Icon
// Image
import FormSignUp from "../FormSignUp/formSignUp";


function SideBarRight({ statusProfile, setStatusProfile,statusSignIn,setStatusSignIn }) {

    const closeProfile = useCallback(() => {
        setStatusProfile(false);
    }, [statusProfile])

    // Modal SignIn
    const [statusModalSignIn, setStatusModalSignIn] = useState(false)

    const openModalSignIn = useCallback(() => {
        setStatusModalSignIn(true)
    })
    //End Modal SignIn
    //Modal SignUp
    const [statusModalSignUp, setStatusModalSignUp] = useState(false)

    const openModalSignUp = useCallback(() => {
        setStatusModalSignUp(true)
    })
    //End Modal SignUp

    useEffect(() => {
        const sbr = document.querySelector(".sideBarRight")
        if (!sbr) return;
        if (!statusProfile) sbr.classList.add("close")
        else sbr.classList.remove("close")
    }, [statusProfile])

    return (
        <>
            {statusSignIn ? (
                <div className={`sideBarRight ${!statusProfile ? "close" : ""}`}>
                    <div className="container bg-white h-screen border-box px-3">
                        <Profile
                            setStatusProfile={setStatusProfile}
                            closeProfile={closeProfile}
                        />
                    </div>
                </div>
            ) : (
                <div className="s-button d-flex items-center gap-x-2 relative">
                    <button className="buttonSignIn bg-blue-200 font-bold text-white border-none py-2 px-2 rounded cursor-pointer relative" onClick={openModalSignIn}>Sign In</button>
                    <button className="buttonSignUp bg-white font-bold text-black border-none py-2 px-2 rounded cursor-pointer relative" onClick={openModalSignUp}>Sign Up</button>
                </div>
            )}
            {/* Modal SignIn */}
            <FormSignIn statusModalSignIn={statusModalSignIn} setStatusModalSignIn = {setStatusModalSignIn} setStatusSignIn={setStatusSignIn} />
            {/* End ModalSignIn */}
            {/* Modal SignUp */}
            <FormSignUp statusModalSignUp = {statusModalSignUp} setStatusModalSignUp = {setStatusModalSignUp} />
            {/* End Modal Signup */}
            
        </>
    )
}
export default SideBarRight;