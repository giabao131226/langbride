import { FaSearch } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { Carousel, Button, Dropdown, Space, Modal, Form, Input, message } from 'antd'

import "./home.css"
import { useCallback, useContext, useEffect, useState } from "react";

import FormSignUp from "../FormSignUp/formSignUp";

import FormSignIn from "../FormSignIn/formSignIn";
import { useOutletContext } from "react-router-dom";


function Home() {
    const { statusSignIn, setStatusSignIn } = useOutletContext();

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
        setInterval(() => {
            const textMain = document.querySelector(".slick-active .slide .text-main")
            const textMainBelow = document.querySelector(".slick-active .slide .text-main-below")
            if (textMain && textMainBelow) {
                textMain.classList.add("open")
                textMainBelow.classList.add("open")

                const interval2 = setInterval(() => {
                    textMain.classList.toggle("open")
                    textMainBelow.classList.toggle("open")
                }, 4000)

                return () => clearInterval(interval2)
            }
        }, [2000])
    }, [])
    return (
        <>
            <div className="container px-4 py-3">

                <div className="d-flex justify-between items-center gap-x-3">
                    <div className="bg-white d-flex items-center py-3 px-2 gap-x-2 rounded-lg font-20 homeSearch">
                        <FaSearch></FaSearch>
                        <input type="text" name="homeSearch" className="border-none outline-none font-bold col-11 px-0 py-0" placeholder="Search something here..." ></input>
                    </div>

                    <div className="font-20">
                        <FaFilter />
                    </div>

                    {statusSignIn ? <></> : <div className="d-flex items-center gap-x-2">
                        <button className="buttonSignIn bg-blue-200 font-bold text-white border-none py-2 px-2 rounded cursor-pointer relative" onClick={openModalSignIn}>Sign In</button>
                        <button className="buttonSignUp bg-white font-bold text-black border-none py-2 px-2 rounded cursor-pointer relative" onClick={openModalSignUp}>Sign Up</button>
                    </div>}
                </div>
                <div className="py-2">
                    <Carousel arrows autoplay autoplaySpeed={8000}>
                        <div className="slide">
                            <div className="slide-container">
                                <p className="text-main font-bold text-black m-0 text-align-center font-20">Welcome to LangBridge</p>
                                <p className="text-main-below text-black m-0 text-align-center">You can learn a foreign language whenever you want.</p>
                            </div>
                        </div>
                        <div className="slide s-2">
                            <div className="slide-container">
                                <p className="text-main font-bold text-black m-0 text-align-center font-20">Welcome to LangBridge</p>
                                <p className="text-main-below text-black m-0 text-align-center">Welcome to LangBridge</p>
                            </div>
                        </div>
                        <div className="slide s-3">
                            <div className="slide-container">
                                <p className="text-main font-bold text-black m-0 text-align-center font-20">Welcome to LangBridge</p>
                                <p className="text-main-below text-black m-0 text-align-center">Welcome to LangBridge</p>
                            </div>
                        </div>
                        <div className="slide">
                            <div className="slide-container">
                                <p className="text-main font-bold text-black m-0 text-align-center font-20">Welcome to LangBridge</p>
                                <p className="text-main-below text-black m-0 text-align-center">Welcome to LangBridge</p>
                            </div>
                        </div>
                    </Carousel>
                </div>
            </div>
            {/* Modal SignIn */}
            <FormSignIn statusModalSignIn={statusModalSignIn} setStatusModalSignIn={setStatusModalSignIn} setStatusSignIn={setStatusSignIn} />
            {/* End ModalSignIn */}
            {/* Modal SignUp */}
            <FormSignUp statusModalSignUp={statusModalSignUp} setStatusModalSignUp={setStatusModalSignUp} />
            {/* End Modal Signup */}
        </>
    )
}
export default Home;