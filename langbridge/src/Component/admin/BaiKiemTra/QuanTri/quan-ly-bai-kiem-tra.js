import { Link } from "react-router-dom"
import { IoPersonSharp } from "react-icons/io5";
import { FaBan } from "react-icons/fa";
import { FaUnlockAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";

import { Modal, notification } from "antd";

export default function QuanLyBaiKiemTra() {
    const [listTest, setListTest] = useState([]);
    const [idRemove, setIDRemove] = useState(null);
    const [statusModal, setStatusModal] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [textSearch, setTextSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [level,setLevel] = useState("all");
    const [language,setLanguage] = useState("all");
    const [pageInfo, setPageInfo] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [tongQuan, setTongQuan] = useState({});


    function handleRemoveTest(id){
        console.log(id);
        fetch(`http://localhost:5000/admin1/quan-ly-bai-kiem-tra/remove`,{
            method: "PATCH",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({"id": id})
        })
            .then(res => res.json())
            .then(data => {
                if(data.success){
                    api.open({
                        title: "Thông báo",
                        description: `Bạn vừa xoá bài kiểm tra có id là: ${id}\nBạn có thể khôi phục trong phần mục đã xoá.`
                    })
                }
            })
    }

    function handleChangeStatus(id, status = "in-active") {
        fetch(`http://localhost:5000/admin1/quan-ly-bai-kiem-tra/change-status/${id}/${status}?_method=PATCH`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    api.info({
                        title: "Notification",
                        description: `You have banned the account with ID ${id}`,
                    });
                    const newList = listTest.map((item) => {
                        if (item._id == id) item.status = status;
                        return item;
                    });
                    setListTest(newList);
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

    function handleChangePage(e) {
        setCurrentPage(parseInt(e.target.getAttribute("pag")));
    }

    function loadPagination(first, last) {
        const items = [pageInfo.pageCurrent == 1 ? <></> : <button pag={pageInfo.pageCurrent - 1} onClick={handleChangePage}>Previous</button>];
        for (var i = first; i <= last; i++) {
            items.push(<button pag={i} key={i} className={pageInfo.pageCurrent == i ? "active" : ""} onClick={handleChangePage}>{i}</button>)
        }
        items.push(pageInfo.pageCurrent == pageInfo.numberPages ? <></> : <button pag={pageInfo.pageCurrent + 1} onClick={handleChangePage}>Next</button>)
        return items;
    }

    useEffect(() => {
        fetch(`http://localhost:5000/admin1/quan-ly-bai-kiem-tra?textSearch=${textSearch}&status=${status}&page=${currentPage}&language=${language}&level=${level}`, {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    setTongQuan(data.tongQuanBaiTest);
                    setListTest(data.listTest);
                    setPageInfo(data.pageInfo);
                }
            })
    }, [status, textSearch, currentPage,level,language])

    return (
        <>
            {contextHolder}
            <div className="container-fluid text-align-start px-3">
                <div className="container">
                    <div className="d-flex items-center justify-between py-2">
                        <div className="d-flex flex-column py-3">
                            <h1 className="m-0">Quản Lý Bài Kiểm Tra</h1>
                            <p className="m-0 font-14 font-bold" style={{ color: "#afa6a6" }}>Theo dõi và quản lý toàn bộ bài kiểm tra</p>
                        </div>
                        <Link to = {"create"}><button className="bg-blue font-bold text-white px-2 py-2 rounded cursor-pointer"><i class="fa-solid fa-plus"></i> Thêm mới</button></Link>
                    </div>

                    {/* Bảng số lượng */}
                    <div className="stats-grid">

                        <div className="stat-card">
                            <div className="stat-icon blue">
                                <i class="fa-solid fa-file-lines"></i>
                            </div>

                            <div>
                                <p className="m-0 font-14">Tổng bài test</p>
                                <h4 className="m-0 py-2">{tongQuan.countToTalTest}</h4>
                                <span className="font-14 m-0">Toàn bộ hệ thống</span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon green">
                                <i className="fa-solid fa-circle-check"></i>
                            </div>

                            <div>
                                <p className="m-0 font-14">Đang hoạt động</p>
                                <h4 className="m-0 py-2">{tongQuan.countActiveTest}</h4>
                                <span className="font-14 m-0">{((tongQuan.countActiveTest / tongQuan.countToTalTest) * 100).toFixed(2)}% tổng bài test</span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon red">
                                <i className="fa-solid fa-lock"></i>
                            </div>

                            <div>
                                <p className="m-0 font-14">Bị khóa</p>
                                <h4 className="m-0 py-2">{tongQuan.countInActiveTest}</h4>
                                <span className="font-14 m-0">{((tongQuan.countInActiveTest / tongQuan.countToTalTest) * 100).toFixed(2)}% tổng bài test</span>
                            </div>
                        </div>

                    </div>
                    {/* Bộ lọc */}
                    <div className="filter-card">
                        <div className="filter-top">
                            <h3 className="m-0">Filter</h3>
                        </div>

                        <div className="filter-row">
                            
                            <select className="col-4" name="filterStatus" onChange={(e) => {setLevel(e.target.value)}}>
                                <option value={"all"}>Trình độ</option>
                                <option value={"easy"}>Easy</option>
                                <option value={"medium"}>Medium</option>
                                <option value={"hard"}>Hard</option>
                                <option value={"expert"}>Expert</option>
                            </select>

                            <select className="col-4" name="filterStatus" onChange={handleChangeStatusFilter}>
                                <option value={"all"}>Status</option>
                                <option value={"active"}>Active</option>
                                <option value={"in-active"}>In-Active</option>
                            </select>

                            <select className="col-4" name="filterStatus" onChange={(e) => {setLanguage(e.target.value)}}>
                                <option value={"all"}>Ngôn ngữ</option>
                                <option value={"english"}>English</option>
                                <option value={"chinese"}>Chinese</option>
                                <option value={"korea"}>Korea</option>
                                <option value={"japanese"}>Japanese</option>
                            </select>
                        </div>
                    </div>

                    <div className="quanLyNhanVienMain bg-white">
                        <table className="listTaiKhoan col-12 px-0 py-0">
                            <thead>
                                <tr>
                                    <th className="bg-blue text-white py-2">STT</th>
                                    <th className="bg-blue text-white py-2">Tên bài test</th>
                                    <th className="bg-blue text-white py-2">Ngôn ngữ</th>
                                    <th className="bg-blue text-white py-2">Trình độ</th>
                                    <th className="bg-blue text-white py-2">Số câu</th>
                                    <th className="bg-blue text-white py-2">Thời gian</th>
                                    <th className="bg-blue text-white py-2">Lượt làm</th>
                                    <th className="bg-blue text-white py-2">Trạng thái</th>
                                    <th className="bg-blue text-white py-2">Hành động</th>
                                </tr>
                            </thead>

                            <tbody>
                                {listTest.map((item, index) => <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.testName}</td>
                                    <td>{item.language}</td>
                                    <td>{item.level}</td>
                                    <td>{item.totalQuestion}</td>
                                    <td>{item.timeLimit}</td>
                                    <td>{item.totalQuestion}</td>
                                    <td>Active</td>
                                    <td>
                                        <div className="d-flex items-center justify-center gap-x-2">
                                            <Link><button className="border-none cursor-pointer bg-blue text-white px-2 py-2 rounded"><i class="fa-solid fa-eye"></i></button></Link>
                                            <Link to={`account/${item._id}`}><button className="border-none cursor-pointer bg-blue text-white px-2 py-2 rounded"><i class="fa-solid fa-pen"></i></button></Link>
                                            {item.status == "in-active" ? <button className="border-none cursor-pointer bg-coral text-white px-2 py-2 rounded" onClick={() => { handleChangeStatus(item._id, "active") }}><FaUnlockAlt /></button> : <button className="border-none cursor-pointer bg-orange text-white px-2 py-2 rounded" onClick={() => { handleChangeStatus(item._id, "in-active") }}><FaBan /></button>}
                                            <button className="border-none cursor-pointer bg-red text-white px-2 py-2 rounded" onClick={() => {handleRemoveTest(item._id)}}><FaTrash /></button>
                                        </div>
                                    </td>
                                </tr>)}

                            </tbody>
                        </table>

                        <span className="font-14">Tổng số bản ghi: {listTest.length}</span>

                        <div className="pagination d-flex items-center justify-center gap-x-3">
                            {Object.keys(pageInfo).length > 0 ? loadPagination(pageInfo.firstPage, pageInfo.lastPage) : <></>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}