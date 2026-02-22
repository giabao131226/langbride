
import { useCallback, useEffect, useState } from "react";

import FormSignUp from "../FormSignUp/formSignUp";

import FormSignIn from "../FormSignIn/formSignIn";
import { useOutletContext } from "react-router-dom";

import "./quiz.css"
//ICON
import { FaAngleRight, FaStar } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { TbMoodEmptyFilled } from "react-icons/tb";

//Component
import { Link } from "react-router-dom"

function Quiz() {

    const { statusSignIn, setStatusSignIn } = useOutletContext()

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

    return (
        <>
            <div className="quiz container px-2 py-3">
                <div className="quiz__container px-4 gap-x-3">
                    <div className="d-flex items-center justify-between py-2">
                        <h1 className="m-0 font-bold text-blue-400">LangBridge QUIZ</h1>
                        <button className="border-none py-2 px-2 font-bold text-white font-16 rounded bg-blue-200 cursor-pointer">+ Create New Quiz</button>
                    </div>

                    <div className="quizTopic d-flex items-center py-2 justify-evently">
                        <Link to={"#"} className="text-decoration-none text-black">
                            <div className="topic d-flex flex-column items-center font-25">
                                <MdHome />
                                <span className="font-bold font-14">ALL</span>
                            </div>
                        </Link>
                        <Link to={"#"} className="text-decoration-none text-black">
                            <div className="topic d-flex flex-column items-center font-25">
                                <MdHome />
                                <span className="font-bold font-14">EngLish</span>
                            </div>
                        </Link>
                        <Link to={"#"} className="text-decoration-none text-black">
                            <div className="topic d-flex flex-column items-center font-25">
                                <MdHome />
                                <span className="font-bold font-14">France</span>
                            </div>
                        </Link>
                        <Link to={"#"} className="text-decoration-none text-black">
                            <div className="topic d-flex flex-column items-center font-25">
                                <MdHome />
                                <span className="font-bold font-14">China</span>
                            </div>
                        </Link>
                        <Link to={"#"} className="text-decoration-none text-black">
                            <div className="topic d-flex flex-column items-center font-25">
                                <MdHome />
                                <span className="font-bold font-14">VietNamese</span>
                            </div>
                        </Link>
                        <Link to={"#"} className="text-decoration-none text-black">
                            <div className="topic d-flex flex-column items-center font-25">
                                <MdHome />
                                <span className="font-bold font-14">India</span>
                            </div>
                        </Link>
                        <Link to={"#"} className="text-decoration-none text-black">
                            <div className="topic d-flex flex-column items-center font-25">
                                <MdHome />
                                <span className="font-bold font-14">ThaiLand</span>
                            </div>
                        </Link>
                        <Link to={"#"} className="text-decoration-none text-black">
                            <div className="topic d-flex flex-column items-center font-25">
                                <MdHome />
                                <span className="font-bold font-14">Cambodia</span>
                            </div>
                        </Link>
                        <Link to={"#"} className="text-decoration-none text-black">
                            <div className="topic d-flex flex-column items-center font-25">
                                <MdHome />
                                <span className="font-bold font-14">Malaysia</span>
                            </div>
                        </Link>
                    </div>

                    <div className="py-2">
                        <div className="quizHead d-flex items-center justify-between">
                            <h1 className="m-0">Your Quiz</h1>
                            <a href="#" className="text-decoration-none">See All</a>
                        </div>
                        {statusSignIn ? <>
                            <div className="yourQuiz d-flex items-center gap-x-3 relative py-3">
                                <button className="absolute font-20 border-none bg-gray-600 text-align-center px-2 py-1 cursor-pointer buttonChangePage"><FaAngleLeft /></button>
                                <button className="absolute font-20 border-none bg-gray-600 text-align-center px-2 py-1 cursor-pointer buttonChangePage"><FaAngleRight /></button>
                                <div className="quizItem px-0 py-0 over-flow-hidden">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnb2FDA6aaqZr3JviAqU70J69VH_xCqBHu9w&s"></img>

                                    <div className="quizInfo">
                                        <div className="px-2">
                                            <p className="m-0 font-bold py-1">Quiz Name</p>
                                            <div className="font-11 font-bold d-flex items-center py-2 gap-x-4">
                                                <span className="text-orange d-flex items-center">Rate: 4.5<FaStar /></span>
                                                <span className="">By nameAuthor</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="quizItem px-0 py-0 over-flow-hidden">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnb2FDA6aaqZr3JviAqU70J69VH_xCqBHu9w&s"></img>

                                    <div className="quizInfo">
                                        <div className="px-2">
                                            <p className="m-0 font-bold py-1">Quiz Name</p>
                                            <div className="font-11 font-bold d-flex items-center py-2 gap-x-4">
                                                <span className="text-orange d-flex items-center">Rate: 4.5<FaStar /></span>
                                                <span className="">By nameAuthor</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="quizItem px-0 py-0 over-flow-hidden">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnb2FDA6aaqZr3JviAqU70J69VH_xCqBHu9w&s"></img>

                                    <div className="quizInfo">
                                        <div className="px-2">
                                            <p className="m-0 font-bold py-1">Quiz Name</p>
                                            <div className="font-11 font-bold d-flex items-center py-2 gap-x-4">
                                                <span className="text-orange d-flex items-center">Rate: 4.5<FaStar /></span>
                                                <span className="">By nameAuthor</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="quizItem px-0 py-0 over-flow-hidden">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnb2FDA6aaqZr3JviAqU70J69VH_xCqBHu9w&s"></img>

                                    <div className="quizInfo">
                                        <div className="px-2">
                                            <p className="m-0 font-bold py-1">Quiz Name</p>
                                            <div className="font-11 font-bold d-flex items-center py-2 gap-x-4">
                                                <span className="text-orange d-flex items-center">Rate: 4.5<FaStar /></span>
                                                <span className="">By nameAuthor</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="quizItem px-0 py-0 over-flow-hidden">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnb2FDA6aaqZr3JviAqU70J69VH_xCqBHu9w&s"></img>

                                    <div className="quizInfo">
                                        <div className="px-2">
                                            <p className="m-0 font-bold py-1">Quiz Name</p>
                                            <div className="font-11 font-bold d-flex items-center py-2 gap-x-4">
                                                <span className="text-orange d-flex items-center">Rate: 4.5<FaStar /></span>
                                                <span className="">By nameAuthor</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </> : <>
                            <div>
                                <div className="text-align-center d-flex flex-column items-center">
                                    <p className="m-0 font-bold text-gray-200 font-25 py-2 d-flex items-center"><TbMoodEmptyFilled /> You must log in first!!</p>
                                    <div className="d-flex items-center gap-x-2">
                                        <button className="buttonSignIn bg-blue-200 font-bold text-white border-none py-2 px-2 rounded cursor-pointer relative" onClick={openModalSignIn}>Sign In</button>
                                        <button className="buttonSignUp bg-white font-bold text-black border-none py-2 px-2 rounded cursor-pointer relative" onClick={openModalSignUp}>Sign Up</button>
                                    </div>
                                </div>
                            </div>
                        </>}
                    </div>

                    <div className="py-2">
                        <div>
                            <div className="quizHead d-flex items-center justify-between">
                                <h1 className="m-0 font-bold">Best Rating Right Now</h1>
                                <a href="#" className="text-decoration-none">See All</a>
                            </div>


                            <div className="yourQuiz d-flex items-center gap-x-3 relative py-3">
                                <button className="absolute font-20 border-none bg-gray-600 text-align-center px-2 py-1 cursor-pointer buttonChangePage"><FaAngleLeft /></button>
                                <button className="absolute font-20 border-none bg-gray-600 text-align-center px-2 py-1 cursor-pointer buttonChangePage"><FaAngleRight /></button>
                                <div className="quizItem px-0 py-0 over-flow-hidden">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnb2FDA6aaqZr3JviAqU70J69VH_xCqBHu9w&s"></img>

                                    <div className="quizInfo">
                                        <div className="px-2">
                                            <p className="m-0 font-bold py-1">Quiz Name</p>
                                            <div className="font-11 font-bold d-flex items-center py-2 gap-x-4">
                                                <span className="text-orange d-flex items-center">Rate: 4.5<FaStar /></span>
                                                <span className="">By nameAuthor</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="quizItem px-0 py-0 over-flow-hidden">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnb2FDA6aaqZr3JviAqU70J69VH_xCqBHu9w&s"></img>

                                    <div className="quizInfo">
                                        <div className="px-2">
                                            <p className="m-0 font-bold py-1">Quiz Name</p>
                                            <div className="font-11 font-bold d-flex items-center py-2 gap-x-4">
                                                <span className="text-orange d-flex items-center">Rate: 4.5<FaStar /></span>
                                                <span className="">By nameAuthor</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="quizItem px-0 py-0 over-flow-hidden">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnb2FDA6aaqZr3JviAqU70J69VH_xCqBHu9w&s"></img>

                                    <div className="quizInfo">
                                        <div className="px-2">
                                            <p className="m-0 font-bold py-1">Quiz Name</p>
                                            <div className="font-11 font-bold d-flex items-center py-2 gap-x-4">
                                                <span className="text-orange d-flex items-center">Rate: 4.5<FaStar /></span>
                                                <span className="">By nameAuthor</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="quizItem px-0 py-0 over-flow-hidden">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnb2FDA6aaqZr3JviAqU70J69VH_xCqBHu9w&s"></img>

                                    <div className="quizInfo">
                                        <div className="px-2">
                                            <p className="m-0 font-bold py-1">Quiz Name</p>
                                            <div className="font-11 font-bold d-flex items-center py-2 gap-x-4">
                                                <span className="text-orange d-flex items-center">Rate: 4.5<FaStar /></span>
                                                <span className="">By nameAuthor</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="quizItem px-0 py-0 over-flow-hidden">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnb2FDA6aaqZr3JviAqU70J69VH_xCqBHu9w&s"></img>

                                    <div className="quizInfo">
                                        <div className="px-2">
                                            <p className="m-0 font-bold py-1">Quiz Name</p>
                                            <div className="font-11 font-bold d-flex items-center py-2 gap-x-4">
                                                <span className="text-orange d-flex items-center">Rate: 4.5<FaStar /></span>
                                                <span className="">By nameAuthor</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
export default Quiz;