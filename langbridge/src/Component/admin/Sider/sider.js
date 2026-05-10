
import { MdMenu } from "react-icons/md";
import "./sider.css"
import {Link} from "react-router-dom";

export default function Sider(){
    return (
        <>
            <div className="sider bg-black bg-white d-flex flex-column justify-start px-4 py-2">
                <div className="d-flex items-center justify-between text-white">
                    <span className="header-admin-title">Admin</span>
                    <button className="cursor-pointer bg-transparent border-none font-20 text-white"><MdMenu /></button>
                </div>

                <nav className="d-flex flex-column">
                    <Link to = {"/admin/quan-ly-tai-khoan"} className={"text-decoration-none nav-item-admin relative " + (window.location.pathname.includes("/admin/quan-ly-tai-khoan") ? "active" : "")}> <span className="font-bold font-14 text-white cursor-pointer">Tài Khoản</span></Link>
                    <Link to = {"/"} className="text-decoration-none nav-item-admin relative"> <span className="font-bold font-14 text-white cursor-pointer">Bài Đăng</span></Link>
                    <Link to = {"/"} className="text-decoration-none nav-item-admin relative"> <span className="font-bold font-14 text-white cursor-pointer">Bài Kiểm Tra</span></Link>
                </nav>
            </div>      
        </>
    )
}