import { RiListSettingsFill } from "react-icons/ri";
import avatar from '../../assets/img/566048339_810848405053109_4477395456959017009_n.jpg';
import "./sidebarright.css"
import { FaBell } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Button, Carousel, Dropdown, Space, Modal, Form, Input,message } from 'antd'
import { use, useCallback, useEffect, useState } from "react";
import Profile from "../Profile/profile";
import FormSignIn from "../FormSignIn/formSignIn";
import { Link } from "react-router-dom"
// Icon
import { IoPerson } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

// Image
import smileGirl from '../../assets/img/ImgSignIn.png'


function SideBarRight({ statusProfile, setStatusProfile }) {
    const [statusSignIn, setStatusSignIn] = useState(window.localStorage.getItem("account") ? true : false);
    const [accountSignIn, setAccountSignIn] = useState({})

    const [messageApi, contextHolder] = message.useMessage();
    // Submit Form SignIn
    const handleSignIn = useCallback((e) => {
        e.preventDefault();


        console.log(accountSignIn)
        fetch(`http://localhost:3000/user?userName=${accountSignIn.userName}&passWord=${accountSignIn.passWord}`)
            .then(res => res.json())
            .then(data => {
                if(data[0]){
                    message.open({
                        type: "success",
                        content: "Congratulations!! You have successfully logged in."
                    })
                    window.localStorage.setItem("user",data[0])
                    setStatusModalSignIn(false)
                    setStatusSignIn(true)
                }else{
                    message.open({
                        type: "error",
                        content: "Your username or password is incorrect. Please re-enter it."
                    })
                }
            })
    })
    //End Submit Form SignIn
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
    //End Modal SignIn
    //Modal SignUp
    const [statusModalSignUp, setStatusModalSignUp] = useState(false)

    const openModalSignUp = useCallback(() => {
        setStatusModalSignUp(true)
    })
    const closeModalSignUp = useCallback(() => {
        setStatusModalSignUp(false)
    })
    //End Modal SignUp

    useEffect(() => {
        const sbr = document.querySelector(".sideBarRight")
        if (!sbr) return;
        if (!statusProfile) sbr.classList.add("close")
        else sbr.classList.remove("close")
    }, [statusProfile])

    useEffect(() => {
        const SignInForm = document.querySelector("#sign-in-form")
        if (SignInForm) {
            const inputSignIns = SignInForm.querySelectorAll("input")
            inputSignIns.forEach((item) => {
                item.addEventListener("change", (e) => {
                    const value = e.target.value;
                    const tenTruong = e.target.name;

                    const newObject = { ...accountSignIn };

                    newObject[tenTruong] = value;
                    setAccountSignIn(newObject)
                })
            })
        }
    })
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
            <Modal open={statusModalSignIn} onCancel={closeModalSignIn} footer={false} className="modalSignIn" style={{ top: "5%" }}>
                <div className="signInFormVienIMG">
                    <img src={smileGirl}></img>
                </div>
                <h1 className="m-0 text-align-center text-purple">WelCome</h1>
                <form className="d-flex flex-column gap-y-2" methods="POST" id="sign-in-form" onSubmit={handleSignIn}>
                    <div className="d-flex flex-column relative divInputSignIn">
                        <label className="font-bold text-gray-200">UserName</label>
                        <input type="text" minLength={8} placeholder="Please enter your username..." className="signIninput py-2 px-6 font-bold" name="userName" required></input>
                        <IoPerson className="iconSignIn" />
                    </div>
                    <div className="d-flex flex-column relative divInputSignIn">
                        <label className="font-bold text-gray-200">PassWord</label>
                        <input type="password" minLength={8} placeholder="Please enter your password..." className="signIninput py-2 px-6 font-bold" name="passWord" required></input>
                        <FaLock className="iconSignIn" />
                    </div>
                    <Link to={"/"}><p className="m-0 font-14 font-bold">Forgot Password?</p></Link>
                    <button type="submit" className="signInButton bg-orange text-white border-none font-bold py-2 rounded cursor-pointer">Sign In</button>

                    <div className="d-flex justify-between items-center">
                        <p className="m-0 font-bold">No Account? Create Here</p>
                        <p className="m-0 font-bold"> Terms and Conditions</p>
                    </div>
                </form>
            </Modal>
            {/* End ModalSignIn */}
            {/* Modal SignUp */}
            <Modal open={statusModalSignUp} onCancel={closeModalSignUp} footer={false} className="modalSignUp" style={{ top: "5%" }}>
                <div className="signInFormVienIMG">
                    <img src={smileGirl}></img>
                </div>
                <h1 className="m-0 text-align-center text-purple">WelCome</h1>
                <form className="d-flex flex-column gap-y-2" method="POST">
                    <div className="d-flex flex-column relative divInputSignIn">
                        <label className="font-bold text-gray-200">UserName</label>
                        <input type="text" minLength={8} maxLength={20} placeholder="Please enter your username..." className="signIninput py-2 px-6 font-bold" name="userName" required></input>
                        <IoPerson className="iconSignIn" />
                    </div>
                    <div className="d-flex flex-column relative divInputSignIn">
                        <label className="font-bold text-gray-200">PassWord</label>
                        <input type="password" minLength={8} placeholder="Please enter your password..." className="signIninput py-2 px-6 font-bold" name="passWord" required></input>
                        <FaLock className="iconSignIn" />
                    </div>
                    <div className="d-flex flex-column relative divInputSignIn">
                        <label className="font-bold text-gray-200">Email</label>
                        <input type="email" minLength={8} placeholder="Please enter your email..." className="signIninput py-2 px-6 font-bold" name="email" required></input>
                        <MdEmail className="iconSignIn" />
                    </div>
                    <div className="d-flex flex-column relative divInputSignIn">
                        <label className="font-bold text-gray-200">Phone</label>
                        <input type="text" minLength={10} placeholder="Please enter your phone number..." className="signIninput py-2 px-6 font-bold" name="phone" required></input>
                        <FaPhoneAlt className="iconSignIn" />
                    </div>

                    <button type="submit" className="signInButton bg-orange text-white border-none font-bold py-2 rounded cursor-pointer">Sign Up</button>

                    <div className="d-flex justify-between items-center">
                        <p className="m-0 font-bold">Got Account? Sign in Here</p>
                        <p className="m-0 font-bold"> Terms and Conditions</p>
                    </div>
                </form>
            </Modal>
        </>
    )
}
export default SideBarRight;