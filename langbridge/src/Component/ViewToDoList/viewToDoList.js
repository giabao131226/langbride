
import "./viewToDoList.css"

import { SiTask } from "react-icons/si";
import { MdOutlineDone } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { IoFlash } from "react-icons/io5";
import { DatePicker, message, notification } from 'antd';
import { useCallback, useEffect, useState } from "react";
import { MdError } from "react-icons/md";
import { MdDone } from "react-icons/md";
import { useOutletContext } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";




const { RangePicker } = DatePicker;

function ViewToDoList() {

    const { reload, setReload } = useOutletContext()

    // Notification antd
    const [api, contextHolder] = notification.useNotification();
    // End Notification antd

    const [toDoList, setToDoList] = useState([])

    const [rangeDate, setRangeDate] = useState(null)

    const submitTaskToDoList = useCallback((e) => {
        e.preventDefault();

        const acc = JSON.parse(localStorage.getItem("user"))
        if (acc) {
            const content = e.target.querySelector("input[name='conTent']").value

            if (content?.trim()) {
                const data = {
                    ownerID: acc._id,
                    status: "pending",
                    conTent: content,
                    dateStart: rangeDate[0],
                    dateEnd: rangeDate[1]
                }

                fetch(`http://localhost:5000/to-do-list/add-task`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                    .then(res => res.json())
                    .then(duLieu => {
                        api.info({
                            title: "Congratulation!!",
                            description: "You have successfully added the task.",
                            icon: <MdOutlineDone />
                        })
                        setReload(prev => !prev)

                    })
            } else {
                api.info({
                    title: "Error!!",
                    description: "You need to add the tasks you have to do.",
                    icon: <MdError />
                })
            }
        }
    })

    function handleChangeStatus(id){
        fetch(`http://localhost:5000/to-do-list/change-status/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            }, body: JSON.stringify({ status: "complete" })
        })
            .then(res => res.json())
            .then(data => {
                api.info({
                    title: "Congratulation!!",
                    description: "Great! You've just completed a task.",
                    icon: <MdOutlineDone />
                })
                setReload(prev =>  !prev)
            })
    }
    function getStatus(status,dateEnd){
        const now = new Date();
        const date = new Date(dateEnd);
        if(date < now) return "border-timeOut";

        if(status == "pending") return "border-pending";
        return "border-done";
    }

    function handleRemoveItem(id){
        console.log(id);
        fetch(`http://localhost:5000/to-do-list/remove/${id}?_method=PATCH`,{
            method: "POST"
        })
            .then(res => res.json())
            .then(data => {
                if(data.success){
                    api.info({
                        "title": "Deleted Successfully",
                        description: "The todo has been removed successfully."
                    })
                    setReload(prev => !prev)
                }
            })
    }

    useEffect(() => {
    
        if (document.cookie) {
            const acc = JSON.parse(window.localStorage.getItem("user"));
            console.log(acc);
            fetch(`http://localhost:5000/to-do-list/${acc.id}/all`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setToDoList(data)
                })
        }
    }, [reload])

    return (
        <>
            {contextHolder}
            <div className="viewToDoList container-fluid text-algin-start">
                <div className="container">
                    <div className="d-flex flex-column justify-center">
                        <form className="col-12 px-0 py-1 d-flex items-center justify-center" onSubmit={submitTaskToDoList}>
                            <div className="d-flex items-center gap-x-2 col-12 px-2 py-0">
                                <input type="text" name="conTent" className="addTaskInput font-bold col-6" placeholder="Enter the tasks to be done today..."></input>
                                <RangePicker onChange={(dates, dateStrings) => {
                                    setRangeDate(dateStrings);
                                }} />
                            </div>

                            <button type="submit" className="button-ToDoList font-bold px-4 py-3 border-none bg-button-ToDoList" style={{ "border-radius": "20px" }}>+ NEW QUEST</button>
                        </form>

                        <div className="viewToDoListMain d-flex justify-center items-center">

                            <div className="col-5 px-0 py-0 d-flex flex-column gap-y-3">

                                <div className="masteryProgress d-flex flex-column items-center gap-y-3">
                                    <p className="m-0 font-bold text-reddish-brown">MASTERY PROGRESS</p>
                                    {/* Circle Progress */}
                                    <div className="progress relative d-flex justify-center">
                                        <svg className="circle__progress">
                                            <circle cx="75" cy="75" r="60" className="bg"></circle>
                                            <circle cx="75" cy="75" r="60" className="progress-circle"></circle>
                                        </svg>
                                        <div className="text__progress d-flex flex-column items-center absolute">
                                            <p className="m-0 font-bold font-30">68<span className="font-14 font-bold text-blue-400">%</span></p>
                                            <p className="m-0 font-bold font-11 text-blue-400">Nice!!</p>
                                        </div>
                                    </div>
                                    {/* End Circle Progress */}

                                    <p className="text-align-center m-0 font-bold py-2 w-full quantityTask" style={{ zIndex: "1" }}><span className="text-blue-400 font-20">1440</span> QUESTS</p>
                                </div>

                                <div className="d-flex items-center gap-x-3">
                                    <div className="masteryProgressBox d-flex flex-column items-start gap-y-3">
                                        <div className="bg-white rounded-50 d-flex justify-center items-center text-red font-14" style={{ width: "30px", height: "30px" }}>
                                            <FaTasks />
                                        </div>
                                        <div className="d-flex flex-column items-start">
                                            <p className="m-0 font-bold font-30">07</p>
                                            <p className="m-0 font-bold font-11">QUESTS</p>
                                            <p className="m-0 font-bold font-11">REMAINING</p>
                                        </div>
                                    </div>
                                    <div className="masteryProgressBox d-flex flex-column items-start gap-y-3">
                                        <div className="bg-white rounded-50 d-flex justify-center items-center text-blue font-14" style={{ width: "30px", height: "30px" }}>
                                            <IoFlash />
                                        </div>
                                        <div className="d-flex flex-column items-start">
                                            <p className="m-0 font-bold font-30 text-align-center">143</p>
                                            <p className="m-0 font-bold font-11">Quests</p>
                                            <p className="m-0 font-bold font-11">Done</p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="col-6 px-0 py-0">
                                <div className="d-flex items-center justify-between py-3">
                                    <p className="font-bold font-30 m-0">
                                        To Do List
                                    </p>
                                </div>

                                <div className="listTask d-flex flex-column gap-y-2">
                                    {toDoList.map((item, index) => <div key={index} className={"task d-flex items-center justify-between bg-white px-4 py-2 " + getStatus(item.status,item.dateEnd)}>
                                        <div className="col-8 px-2 py-2 d-flex items-center gap-x-3">
                                            <div className="d-flex items-center gap-x-3">

                                                <div className="bg-coral rounded-50 d-flex items-center justify-center font-20" style={{ width: "40px", height: "40px" }}>
                                                    <SiTask />
                                                </div>

                                                <div className="d-flex flex-column">
                                                    <p className="font-bold font-16 m-0 text-align-start">{item.conTent}</p>
                                                    <div className="d-flex items-center gap-x-4">
                                                        <p className="m-0 font-bold font-11">{item.dateStart}</p>
                                                        <p className="m-0 font-bold font-11">{item.dateEnd}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex items-center gap-x-2">
                                            <div className="taskAttribute rounded-50 d-flex items-center justify-center cursor-pointer" onClick={() => {handleRemoveItem(item._id)}}>
                                                <p className="text-white m-0 font-20" style={{height: "20px"}} ><FaTrashAlt /></p>
                                            </div>
                                            <div className="taskAttribute rounded-50 d-flex items-center justify-center cursor-pointer" onClick={() => {handleChangeStatus(item._id)}}>
                                                <p className="text-white m-0 font-20" style={{height: "20px"}}><MdDone /></p>
                                            </div>
                                        </div>
                                        
                                    </div>)}

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