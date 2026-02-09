import { RiListSettingsFill } from "react-icons/ri";
import avatar from '../../assets/img/566048339_810848405053109_4477395456959017009_n.jpg';
import { FaBell } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Button, Carousel, Dropdown, Space } from 'antd'
import { useCallback, useEffect, useState } from "react";
function Profile({setStatusProfile,closeProfile}) {

    const items = [
        {
            key: '1',
            label: (<p className="m-0 px-0 py-0" onClick={closeProfile}>Close</p>)
        }
    ];
    return (
        <>
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
                    <img src={avatar}></img>
                </div>
                <div className="text-align-center py-3">
                    <p className="m-0 font-14 font-bold">Good Morning Name</p>
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
                    <button className="bg-white border-none font-20 px-0 py-0"><IoIosAddCircleOutline /></button>
                </div>
                <div className="todolist col-12 px-0 py-0 d-flex flex-column">
                    <div className="rows items-center gap-x-3 py-2">
                        <p className="todo col-8 font-14 px-0 py-0 m-0">Do something nice for someone</p>
                        <Button type="primary" className="px-2">Done</Button>
                    </div>
                    <div className="rows items-center gap-x-3 py-2">
                        <p className="todo col-8 font-14 px-0 py-0 m-0">Do something nice for someone</p>
                        <Button type="primary" className="px-2">Done</Button>
                    </div>
                    <div className="rows items-center gap-x-3 py-2">
                        <p className="todo col-8 font-14 px-0 py-0 m-0">Do something nice for someone</p>
                        <Button type="primary" className="px-2">Done</Button>
                    </div>
                    <div className="rows items-center gap-x-3 py-2">
                        <p className="todo col-8 font-14 px-0 py-0 m-0">Do something nice for someone</p>
                        <Button type="primary" className="px-2">Done</Button>
                    </div>
                    <Button type="primary">See All</Button>
                </div>
            </div>
        </>
    )
}
export default Profile;