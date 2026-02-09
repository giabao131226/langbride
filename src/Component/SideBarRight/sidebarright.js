import { RiListSettingsFill } from "react-icons/ri";
import avatar from '../../assets/img/566048339_810848405053109_4477395456959017009_n.jpg';
import "./sidebarright.css"
import { FaBell } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Button, Carousel, Dropdown, Space, Modal, Form, Input } from 'antd'
import { useCallback, useEffect, useState } from "react";
import Profile from "../Profile/profile";
import FormSignIn from "../FormSignIn/formSignIn";
import {Link} from "react-router-dom"
// Icon
import { IoPerson } from "react-icons/io5";
import { FaLock } from "react-icons/fa";

// Image
import smileGirl from '../../assets/img/ImgSignIn.png'




function SideBarRight({ statusProfile, setStatusProfile }) {
    const [statusSignIn, setStatusSignIn] = useState(window.localStorage.getItem("account") ? true : false);

    useEffect(() => {
        const sbr = document.querySelector(".sideBarRight")
        if (!sbr) return;
        if (!statusProfile) sbr.classList.add("close")
        else sbr.classList.remove("close")
    }, [statusProfile])

    const closeProfile = useCallback(() => {
        setStatusProfile(false);
    }, [statusProfile])

    const items = [
        {
            key: '1',
            label: (<p className="m-0 px-0 py-0" onClick={closeProfile}>Close</p>)
        }
    ];



    // Modal SignIn
    const [statusModalSignIn, setStatusModalSignIn] = useState(false)

    const openModalSignIn = useCallback(() => {
        setStatusModalSignIn(true)
    })
    const closeModalSignIn = useCallback(() => {
        setStatusModalSignIn(false)
    })


    // 
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
                    <button className="buttonSignUp bg-white font-bold text-black border-none py-2 px-2 rounded cursor-pointer relative">Sign Up</button>
                </div>
            )}

            <Modal open={statusModalSignIn} onCancel={closeModalSignIn} footer={false} className="modalSignIn" style={{ top: "5%" }}>
                <div className="signInFormVienIMG">
                    <img src={smileGirl}></img>
                </div>
                <h1 className="m-0 text-align-center text-purple">WelCome</h1>
                <form className="d-flex flex-column gap-y-2">
                    <div className="d-flex flex-column relative divInputSignIn">
                        <label className="font-bold text-gray-200">UserName</label>
                        <input type="text" minLength={8} placeholder="Please enter your username..." className="signIninput py-2 px-6 font-bold" name="userName"></input>
                        <IoPerson className="iconSignIn"/>
                    </div>
                    <div className="d-flex flex-column relative divInputSignIn">
                        <label className="font-bold text-gray-200">PassWord</label>
                        <input type="password" minLength={8} placeholder="Please enter your password..." className="signIninput py-2 px-6 font-bold" name="passWord"></input>
                        <FaLock className="iconSignIn"/>
                    </div>
                    <Link to = {"/"}><p className="m-0 font-14 font-bold">Forgot Password?</p></Link>
                    <button type="submit" className="signInButton bg-orange text-white border-none font-bold py-2 rounded cursor-pointer">Sign In</button>

                    <div className="d-flex justify-between items-center">
                        <p className="m-0 font-bold">No Account? Create Here</p>
                        <p className="m-0 font-bold"> Terms and Conditions</p>
                    </div>
                </form>
            </Modal>

        </>
    )
}
export default SideBarRight;