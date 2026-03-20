
import "./viewToDoList.css"

import { SiTask } from "react-icons/si";
import { MdOutlineDone } from "react-icons/md";



function ViewToDoList() {
    return (
        <>
            <div className="container-fluid text-algin-start">
                <div className="container">
                    <div className="d-flex items-center">
                        <div className="col-4 px-0 py-0">

                        </div>
                        <div className="col-8 px-0 py-0">
                            <div className="d-flex items-center justify-between">
                                <p className="font-bold font-30 m-0">
                                    Active Quests
                                </p>
                                <button className="button-ToDoList font-bold px-4 py-3 border-none bg-button-ToDoList" style={{ "border-radius": "20px" }}>+ NEW QUEST</button>
                            </div>

                            <div className="d-flex flex-column">
                                <div className="task d-flex items-center justify-between bg-white rounded-lg">
                                    <div className="col-8 d-flex items-center gap-x-3">
                                        <div className="d-flex items-center gap-x-3">
                                            <div className="bg-coral rounded-50 d-flex items-center justify-center" style={{ width: "30px", height: "30px" }}>
                                                <SiTask />
                                            </div>

                                            <div className="d-flex flex-column">
                                                <p className="font-bold font-20 m-0">Grammar Module 1</p>
                                                <div className="d-flex items-center gap-x-4">
                                                    <p className="m-0 font-bold font-14">Start Date</p>
                                                    <p className="m-0 font-bold font-14">End Date</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="taskAttribute bg-black rounded-50 d-flex items-center justify-center" style={{width: "30px",height: "30px"}}>
                                        <p className="text-white m-0"><MdOutlineDone /></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default ViewToDoList;