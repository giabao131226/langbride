import { RiListSettingsFill } from "react-icons/ri";
import avatar from '../../assets/img/566048339_810848405053109_4477395456959017009_n.jpg';
import { FaBell } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Button, Carousel, Dropdown, Space, DatePicker, notification } from 'antd'
import { useCallback, useEffect, useState } from "react";

//CSS
import "./profile.css"
// Icon
import { MdOutlineDone } from "react-icons/md";
import { MdError } from "react-icons/md";


import {Link} from "react-router-dom"

function Profile({ setStatusProfile,closeProfile,reload,setReload }) {
    const [account, setAccount] = useState({})

    // Notification antd
    const [api, contextHolder] = notification.useNotification();
    // End Notification antd

    const { RangePicker } = DatePicker

    const [toDoList, setToDoList] = useState([])

    const [rangeDate, setRangeDate] = useState(null)

    const items = [
        {
            key: '1',
            label: (<Link to = {"/edit-profile"}><p className="m-0 px-0 py-0">Edit Profile</p></Link>)
        },
        {
            key: '2',
            label: (<p className="m-0 px-0 py-0" onClick={closeProfile}>Close</p>)
        }
    ];

    // Modal Todolist
    const clickToModalToDoList = useCallback(() => {
        const modal = document.querySelector(".modalTDL")
        if (modal) {
            modal.classList.toggle("open")
        }
    })

    const closeModalToDoList = useCallback(() => {
        const modal = document.querySelector(".modalTDL")
        if (modal) modal.classList.remove("open")
    })
    // End Modal Todolist

    const submitTaskToDoList = useCallback((e) => {
        e.preventDefault();

        const acc = JSON.parse(localStorage.getItem("user"))
        if (acc) {
            const content = e.target.querySelector("input[name='conTent']").value

            if (content?.trim()) {
                const data = {
                    ownerID: acc.id,
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
                        setReload(prev =>  !prev)
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

    const changeStatusTask = useCallback((id) => {
        console.log(id);
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
    })

    // Hàm Link sang trang todolist
    const handleLinkToToDoList = useCallback(() => {
        window.location.href = "http://localhost:3000/to-do-list"
    })
    // 

    useEffect(() => {
        if (document.cookie) {
            setAccount(JSON.parse(window.localStorage.getItem("user")))
            const acc = JSON.parse(window.localStorage.getItem("user"))
            fetch(`http://localhost:5000/to-do-list/${acc.id}/${"pending"}`)
                .then(res => res.json())
                .then(data => {
                    setToDoList(data)
                })
        }
    }, [reload])

    return (
        <>
            {contextHolder}
            <div className="d-flex flex-column items-center">
                <div className="d-flex items-center justify-between gap-x-25">
                    <p className="font-14 font-bold">Your Profile</p>
                    <Dropdown menu={{ items }}>
                        <a onClick={e => e.preventDefault()}>
                            <Space>
                                <RiListSettingsFill className="cursor-pointer" />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
                <div className="HomevienImg">
                    {
                        account.avatar ? <img src={`http://localhost:5000${account.avatar}`}></img> : <img src={avatar}></img>
                    }
                </div>
                <div className="text-align-center py-3">
                    <p className="m-0 font-14 font-bold">Hello {account.userName}!!</p>
                    <p className="m-0 font-11 font-bold text-gray-200 py-1">Continue Your Journey And Achieve Your Target</p>
                </div>
                <div className="homeTool d-flex gap-x-3">
                    <div><FaBell /></div>
                    <div><FaImage /></div>
                    <div><FaImage /></div>
                </div>
            </div>
            <Carousel arrows autoplay className="py-3">
                <div className="sbrSlide rounded">
                    <p className="text-align-center font-bold text-white">Ôn lại các từ vựng</p>
                </div>
                <div className="sbrSlide rounded">
                    <p className="text-align-center font-bold text-white">Love: Yêu</p>
                </div>
                <div className="sbrSlide rounded">
                    <p className="text-align-center font-bold text-white">Hate: Ghét</p>
                </div>
                <div className="sbrSlide rounded">
                    <p className="text-align-center font-bold text-white">Peripherals: Thiết bị ngoại vi</p>
                </div>
            </Carousel>
            <div className="todoList col-12 px-0 py-0">
                <div className="d-flex items-center justify-between py-2">
                    <p className="font-bold m-0">Your Task</p>
                    <button className="bg-white border-none font-20 px-0 py-0 cursor-pointer" onClick={clickToModalToDoList}><IoIosAddCircleOutline /></button>
                </div>
                <div className="todolist col-12 px-0 py-0 d-flex flex-column">
                    {toDoList.map((item,index) => <><div key = {index} className="rows items-center gap-x-3 py-2">
                        <p className="todo col-8 font-14 px-0 py-0 m-0">{item.conTent}</p>
                        <Button type="primary" className="px-2" onClick={() => { changeStatusTask(item._id) }}>Done</Button>
                    </div></>)}
                    <Button type="primary" onClick={handleLinkToToDoList}>See All</Button>
                </div>
            </div>

            {/* Pop-Up thêm to-do-list */}
            <div className="modalTDL border-box">
                <div className="container border-box px-4 py-3">
                    <div className="d-flex items-center justify-between">
                        <p className="font-16 font-bold m-0">Add Task</p>
                        <button className="border-none px-0 py-0 font-16 bg-white cursor-pointer" onClick={closeModalToDoList}>X</button>
                    </div>
                    <form action="#" className="py-1 d-flex flex-column gap-y-1" method="POST" onSubmit={submitTaskToDoList}>
                        <div className="addTaskElement relative">
                            <p className="font-14 text-gray-200 font-bold m-0 py-1">Content :</p>
                            <input type="text" name="conTent" placeholder="Enter the tasks to be done today..." className="addTaskInput px-1 font-bold py-1"></input>
                        </div>
                        <div className="addTaskElement">
                            <p className="addTaskElement font-14 text-gray-200 font-bold m-0 py-1">Date Start To End :</p>
                            <RangePicker onChange={(dates, dateStrings) => {
                                setRangeDate(dateStrings);
                            }} />
                        </div>
                        <p className="m-0 py-1"></p>
                        <button className="addTaskButton bg-orange text-white font-bold rounded py-1 border-none cursor-pointer" type="submit">Add</button>
                    </form>
                </div>
            </div>
            {/* End pop-up thêm ToDoList */}    
        </>
    )
}
export default Profile;