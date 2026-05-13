import { useEffect, useState } from "react"
import "./quan-ly-bai-dang.css"
import PostCard from "./PostCard/post-card";
import { Image } from "antd";
import { notification, DatePicker, Select } from "antd";


export default function QuanLyBaiDang() {
    const [listPost, setListPost] = useState([]);
    const [dataModal, setDataModal] = useState({});
    const [statusModal, setStatusModal] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [reload, setReload] = useState(false);
    const [dateQuery, setDateQuery] = useState("");
    const [typeQuery, setTypeQuery] = useState("");
    const [inputSearch,setInputSearch] = useState("");

    function openModal() {
        setStatusModal(true);
    }

    function handleChange(value) {
        setTypeQuery(value);
    }

    const onChange = (date, dateString) => {
        if (dateString) {
            const dateSplit = dateString.split("-");
            setDateQuery(dateSplit.join("/"));
        } else setDateQuery("");
    };

    function handleDeletePost(id) {
        fetch(`http://localhost:5000/admin1/quan-ly-bai-dang/remove/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setStatusModal(false);
                    setReload(true);
                } else {
                    console.log(data.message);
                }
            })
    }

    useEffect(() => {
        fetch(`http://localhost:5000/admin1/quan-ly-bai-dang?published-date=${dateQuery}&type=${typeQuery}&search=${inputSearch}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    setListPost(data.listPost);
                } else {
                    console.log(data.error);
                }
            })
    }, [reload, dateQuery, typeQuery,inputSearch])

    return (
        <>
            {contextHolder}
            <div className="app-wrapper">
                <div className="main-card">

                    <div className="search-section">
                        <i className="fa-solid fa-magnifying-glass"></i>

                        <input
                            onChange={(e) => {setInputSearch(e.target.value)}}
                            type="text"
                            id="searchInput"
                            placeholder="Search post content or author..."
                        />
                    </div>

                    <div className="filter-row">

                        <div className="filter-box">
                            <label>PUBLISHED DATE</label>

                            <DatePicker className="input-field" onChange={onChange} />
                        </div>
                        <div className="filter-box">
                            <label>Tag</label>
                            <Select
                                onChange={handleChange}
                                defaultValue={'all'}
                                className="input-field"
                                options={[
                                    {value: 'all',label: "Tất cả"},
                                    { value: 'question', label: "❓ Question" },
                                    { value: 'tip', label: "💡 Tip" },
                                    { value: 'milestone', label: "🎉 Milestone" },
                                    { value: 'vocabulary', label: "📝 Vocabulary" },
                                    { value: 'speaking', label: "🎙️ Speaking" },
                                    { value: 'resoure', label: "📖 Resource" }
                                ]}
                            />
                        </div>
                    </div>
                    {listPost.length > 0 ? <>
                        <div className="table-header">

                            <div className="col-content">
                                CONTENT
                            </div>

                            <div className="col-mod">
                                AUTHOR
                            </div>

                            <div className="col-action">
                                TAG
                            </div>

                            <div className="col-details">
                                ACTION
                            </div>

                        </div>

                        <div id="postContainer">
                            {listPost.map((item, index) => <PostCard key={index} item={item} setDataModal={setDataModal} openModal={openModal} />)}

                        </div></> : <p className="font-bold text-align-center">Hôm nay không có bài đăng nào được đăng. Hãy nghỉ ngơi!!</p>}
                </div>
            </div>

            {statusModal ? <div id="postModal" className="modal">

                <div className="modal-content">

                    <span className="close-modal" onClick={() => { setStatusModal(false) }}>
                        &times;
                    </span>

                    <div className="modal-header">

                        <div className="user-profile">

                            <div
                                className="modal-avatar-square"
                                id="modalAvatar"
                                style={{ overflow: "hidden" }}
                            >
                                <img src={"http://localhost:5000" + dataModal.IDAccount.avatar} style={{ width: "100%" }}></img>
                            </div>

                            <div className="user-name-group">

                                <h4 id="modalAuthor">
                                    {dataModal.IDAccount.userName}
                                </h4>

                                <p id="modalTime">
                                    {dataModal.createAt}
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="modal-body">

                        <div
                            id="modalBodyText"
                            className="post-text"
                            dangerouslySetInnerHTML={{ __html: dataModal.conTent }}
                        >
                        </div>

                        {dataModal.images.map((image) => {
                            <Image width={"50%"} src={"http://localhost:5000" + image.url}></Image>
                        })}
                        <div className="image-preview-placeholder">
                            {dataModal.images ? dataModal.images.map((image) =>
                                <Image width={"30%"} src={"http://localhost:5000" + image.url}></Image>
                            ) : <></>}
                        </div>

                    </div>

                    <div className="modal-footer">

                        <button
                            onClick={() => { handleDeletePost(dataModal._id) }}
                            className="btn-flag"
                            id="btnKeepAction"
                        >
                            <i className="fa-regular fa-trash-can"></i>
                            {" "}Delete
                        </button>

                    </div>

                </div>

            </div> : <></>}
        </>
    )
}