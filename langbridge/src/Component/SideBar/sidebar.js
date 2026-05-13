import { Link, useParams } from 'react-router-dom';
import logo from '../../assets/img/LoGoLangBridge.png'
import { FaHome } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
import { MdPlayLesson } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import './sidebar.css'
import { useCallback,useState } from 'react';
import FormSignIn from '../FormSignIn/formSignIn';
import FormSignUp from '../FormSignUp/formSignUp';

function SideBar({ setStatusSignIn }) {

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

    const logOutAccount = useCallback(() => {
        const account = localStorage.getItem("user")
        if (account) {
            localStorage.removeItem("user")
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost;";
            setStatusSignIn(false)
        }
    })

    function handleHighLight(e) {
        const element = document.querySelectorAll("li.nav-active");
        element.forEach((item) => item.classList.remove("nav-active"));
        e.target.classList.add("nav-active");
    }

    return (
        <>
            <div className="sidebar bg-white h-screen">
                <div className="d-flex flex-column items-center">
                    <Link to={"/"}><img src={logo} className="sideBar__logo"></img></Link>
                    <div className='sideBarNav d-flex flex-column justify-between'>
                        <div className='px-4'>
                            <p className='text-gray-200 font-bold m-0  py-2'>OVERVIEW</p>
                            <ul className='sideBarTool list-style-type-none m-0 px-3 d-flex flex-column gap-y-2'>
                                <Link to={"/"} className='text-decoration-none'><li className='text-black font-bold nav-active' onClick={handleHighLight}><FaHome /> Home</li></Link>
                                <Link to={"quiz"} className='text-decoration-none '><li className='text-black font-bold' onClick={handleHighLight}><MdQuiz /> Quiz</li></Link>
                                <Link to={"/"} className='text-decoration-none '><li className='text-black font-bold' onClick={handleHighLight}><MdPlayLesson /> Lesson</li></Link>
                                <Link to={"/"} className='text-decoration-none '><li className='text-black font-bold' onClick={handleHighLight}><FaTasks /> Task</li></Link>
                                <Link to={"/course"} className='text-decoration-none '><li className='text-black font-bold' onClick={handleHighLight}><FaChalkboardTeacher /> Course</li></Link>
                            </ul>
                        </div>
                        <div>

                        </div>
                        <div className='px-4 py-6'>
                            <p className='text-gray-200 font-bold m-0 py-2'>SETTINGS</p>
                            <ul className='sideBarTool list-style-type-none m-0 px-3 d-flex flex-column gap-y-2'>
                                <Link to={"/"} className='text-decoration-none '><li className='text-black font-bold'><IoMdSettings /> Settings</li></Link>
                                {document.cookie ? <li className='text-red font-bold cursor-pointer' onClick={logOutAccount}><CiLogout /> Logout</li> : <div className={"d-flex flex-column gap-y-2"}>
                                    <button onClick={openModalSignIn} className="btn-signIn">Sign In</button>
                                    <button onClick={openModalSignUp} className="btn-signUp">Sign Up</button>
                                </div>}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <FormSignIn statusModalSignIn={statusModalSignIn} setStatusModalSignIn={setStatusModalSignIn} setStatusSignIn={setStatusSignIn} />
            
            <FormSignUp statusModalSignUp={statusModalSignUp} setStatusModalSignUp={setStatusModalSignUp} />
        </>
    )
}
export default SideBar;