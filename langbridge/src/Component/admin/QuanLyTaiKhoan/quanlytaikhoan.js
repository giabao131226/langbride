import { Link } from "react-router-dom"
import { IoPersonSharp } from "react-icons/io5";
import { FaBan } from "react-icons/fa";
import { FaUnlockAlt } from "react-icons/fa";

import "./quanlytaikhoan.css"
import { useCallback, useEffect, useState } from "react";

import { Modal, notification } from "antd";


export default function QuanLyTaiKhoan() {
    const [listAccount, setListAccount] = useState([]);
    const [idRemove, setIDRemove] = useState(null);
    const [statusModal, setStatusModal] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [textSearch, setTextSearch] = useState("");
    const [status, setStatus] = useState("");
    const [pageInfo,setPageInfo] = useState({});
    const [currentPage,setCurrentPage] = useState(1);


    function handleChangeStatus(id, status = "banned") {
        fetch(`http://localhost:5000/admin1/quan-ly-tai-khoan/change-status/${id}/${status}?_method=PATCH`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    api.info({
                        title: "Notification",
                        description: `You have banned the account with ID ${id}`,
                    });
                    const newList = listAccount.map((item) => {
                        if (item._id == id) item.status = status;
                        return item;
                    });
                    setListAccount(newList);
                    if (statusModal) setStatusModal(false);
                }
            })
    }
    function handleCancel() {
        setStatusModal(false);
    }

    function getBackGround(status) {
        if (status == "active") return "bg-blue";
        else if (status == "banned") return "bg-red";
        return "bg-orange";
    }

    function handleChangeStatusMiddleware(id) {
        setStatusModal(true);
        setIDRemove(id);
    }

    function handleChangeStatusFilter(e) {
        setStatus(e.target.value);
    }

    function handleChangeTextSearch(e) {
        setTextSearch(e.target.value);
    }

    function handleChangePage(e){
        setCurrentPage(parseInt(e.target.getAttribute("pag")));
    }

    function loadPagination(first,last){
        const items = [pageInfo.pageCurrent == 1 ? <></> : <button pag = {pageInfo.pageCurrent - 1} onClick={handleChangePage}>Previous</button>];
        for(var i = first;i<=last;i++){
            items.push(<button pag = {i} key = {i} className={pageInfo.pageCurrent == i ? "active" : ""} onClick={handleChangePage}>{i}</button>)
        }
        items.push(pageInfo.pageCurrent == pageInfo.numberPages ? <></> : <button pag = {pageInfo.pageCurrent + 1} onClick={handleChangePage}>Next</button>)
        return items;
    }

    useEffect(() => {
        fetch(`http://localhost:5000/admin1/quan-ly-tai-khoan?textSearch=${textSearch}&status=${status}&page=${currentPage}`, {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setListAccount(data.listAccount);
                    setPageInfo(data.pageInfo);
                }
            })
    }, [status,textSearch,currentPage])

    return (
        <>
            {contextHolder}
            <Modal title="Notification!!" open={statusModal} onOk={() => { handleChangeStatus(idRemove) }} onCancel={handleCancel} >
                <p>Are you sure you want to ban this account?</p>
            </Modal>
            <div className="container-fluid text-align-start px-3">
                <div className="container">
                    <div className="d-flex items-center justify-between py-2">
                        <span className="font-bold font-20">Quản Lý Tài Khoản</span>
                        <Link><button className="bg-blue font-bold text-white px-2 py-2 rounded cursor-pointer">Thêm mới</button></Link>
                    </div>

                    <div className="quanLyNhanVienMain bg-white">
                        <div className="d-flex flex-column items-start">
                            <span className="font-bold px-2 py-1">Filter And Search</span>
                            <div className="d-flex items-center col-12 px-2">
                                <input type="text" name="search" placeholder="Tên,Email,SĐT" className="col-8" onChange = {handleChangeTextSearch}></input>
                                <div className="px-2"></div>
                                <select className="col-2" name="filterStatus" onChange={handleChangeStatusFilter}>
                                    <option value={""}>Status</option>
                                    <option value={"active"}>Active</option>
                                    <option value={"in-active"}>InActive</option>
                                    <option value={"banned"}>Ban</option>
                                </select>

                            </div>
                        </div>

                        <table className="listTaiKhoan col-12 px-0 py-0">
                            <thead>
                                <tr>
                                    <th className="bg-blue text-white py-2">ID</th>
                                    <th className="bg-blue text-white py-2">UserName</th>
                                    <th className="bg-blue text-white py-2">Email</th>
                                    <th className="bg-blue text-white py-2">Phone Number</th>
                                    <th className="bg-blue text-white py-2">Status</th>
                                    <th className="bg-blue text-white py-2">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {listAccount.map((item) => <tr key={item._id}>
                                    <td>{item._id}</td>
                                    <td>{item.userName}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td><button className={"border-none px-2 py-2 rounded text-white font-bold " + getBackGround(item.status)}>{item.status}</button></td>
                                    <td>
                                        <div className="d-flex items-center justify-center gap-x-2">
                                            <Link to = {`account/${item._id}`}><button className="border-none cursor-pointer bg-blue text-white px-2 py-2 rounded"><IoPersonSharp /></button></Link>
                                            {item.status == "banned" ? <button className="border-none cursor-pointer bg-coral text-white px-2 py-2 rounded" onClick={() => { handleChangeStatus(item._id, "active") }}><FaUnlockAlt /></button> : <button className="border-none cursor-pointer bg-red text-white px-2 py-2 rounded" onClick={() => { handleChangeStatusMiddleware(item._id, "banned") }}><FaBan /></button>}
                                        </div>
                                    </td>
                                </tr>)}

                            </tbody>
                        </table>

                        <span className="font-14">Tổng số bản ghi: {listAccount.length}</span>

                        <div className="pagination d-flex items-center justify-center gap-x-3">
                            
                            {Object.keys(pageInfo).length > 0 ? loadPagination(pageInfo.firstPage,pageInfo.lastPage) : <></>}
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}