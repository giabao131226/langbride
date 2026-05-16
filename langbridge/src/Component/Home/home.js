import { FaSearch } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { Carousel, Button, Dropdown, Space, Modal, Form, Input, message } from 'antd'
import "./home.css"
import { useCallback, useContext, useEffect, useState } from "react";
import Swal from 'sweetalert2'
import FormSignUp from "../FormSignUp/formSignUp";
import FormSignIn from "../FormSignIn/formSignIn";
import { useOutletContext } from "react-router-dom";
import {
    FaHeart,
    FaRegComment,
    FaBookmark,
    FaShareNodes
} from "react-icons/fa6";
import PostCard from "../PostCard/post-card";
import Feed from "../Feed/feed";
import DangTai from "../DangTai/dang-tai";
import banner from "../../assets/img/Gemini_Generated_Image_w2ykbgw2ykbgw2yk.png";
import { Link } from "react-router-dom";



function Home() {
    const { statusSignIn, setStatusSignIn } = useOutletContext();
    const [acc, setAcc] = useState(JSON.parse(localStorage.getItem("user")));
    const [dataUpToServer, setDataUpToServer] = useState({});
    const [images, setImages] = useState([]);
    const [listPost, setListPost] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
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

    function handleChange(e) {
        const { name, value } = e.target;
        setDataUpToServer({ ...dataUpToServer, [name]: value })
    }

    function showImage(e) {
        const file = e.target.files[0];
        if (file) {
            setImages([...images, file]);
        }
        e.target.value = null;
    }

    function handlePostBaiDang(e) {
        e.preventDefault();
        const today = new Date();

        const date =
            `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, "0")
            }/${String(today.getDate()).padStart(2, "0")
            }`;

        const formData = new FormData();
        formData.append("conTent", (dataUpToServer.conTent != undefined ? dataUpToServer.conTent : ""));
        formData.append("IDAccount", acc.id);
        formData.append("createAt", date);
        formData.append("totalLike", 0);
        formData.append("tag", dataUpToServer.tag);
        images.map((item) => {
            formData.append("images", item);
        })
        fetch("http://localhost:5000/post/create", {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    console.log(data);
                    setListPost([data.newPost, ...listPost]);
                    Swal.fire({
                        title: "Good job!",
                        text: data.message,
                        icon: "success"
                    });
                    e.target.reset();
                    setDataUpToServer({});
                    setImages([]);
                }
            })
    }

    // Phân trang
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
    //  End Phân Trang

    useEffect((item) => {
        fetch(`http://localhost:5000/post?page=${currentPage}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setPageInfo(data.pageInfo);
                    setListPost(data.listPost);
                }
            })
    }, [currentPage]);

    function handleRemoveImage(id) {
        const newList = [];
        images.map((item, index) => {
            if (index != id) newList.push(item);
        })
        setImages(newList);
    }

    return (
        <>
            <div className="layout d-block">
                <div className="main-content">
                    <div className="content-wrap">
                        <section className="hero">
                            <div className="hero-left">
                                <h1 className="hero-title">
                                    Learn a language,<br />
                                    <span className="grad">connect the world.</span>
                                </h1>

                                <p className="hero-sub">
                                    Pick up where you left off, explore new lessons, or challenge yourself with today's daily quiz. Your next breakthrough is one lesson away.
                                </p>

                                <div className="hero-actions">
                                    <Link to={"/quiz"}><button className="btn-hero-primary">
                                        <i className="fa fa-play"></i> Continue A Test
                                    </button></Link>

                                    <button className="btn-hero-outline" onClick={() => {
                                        document.querySelector(".section-header").scrollIntoView({behavior: "smooth"});
                                    }}>
                                        <i className="fa fa-compass"></i> View Comunity
                                    </button>
                                </div>

                                <div className="hero-stats">
                                    <div className="banner-stat">
                                        <div className="hero-stat-num">12k+</div>
                                        <div className="hero-stat-label">Active Learners</div>
                                    </div>

                                    <div className="banner-stat">
                                        <div className="hero-stat-num">340</div>
                                        <div className="hero-stat-label">Lessons Completed</div>
                                    </div>

                                    <div className="banner-stat">
                                        <div className="hero-stat-num">98%</div>
                                        <div className="hero-stat-label">Satisfaction Rate</div>
                                    </div>

                                    <div className="banner-stat">
                                        <div className="hero-stat-num">4.9★</div>
                                        <div className="hero-stat-label">Avg. Rating</div>
                                    </div>
                                </div>
                            </div>

                            <div className="hero-right">

                                <div className="hero-float-card">
                                    <div className="lp-header">
                                        <span className="lp-title">
                                            <i className="fa fa-chart-line"></i> My Statistics
                                        </span>
                                    </div>

                                    <div className="lp-items">

                                        <div className="lp-item">
                                            <span className="lp-lang">Tests Taken</span>

                                            <span className="lp-score">24</span>
                                        </div>

                                        <div className="lp-item">

                                            <span className="lp-lang">Average Score</span>

                                            <span className="lp-score">8.2</span>
                                        </div>

                                        <div className="lp-item">

                                            <span className="lp-lang">Best Score</span>
                                            <span className="lp-score">10</span>
                                        </div>

                                        <div className="lp-item">

                                            <span className="lp-lang">Time Practiced</span>

                                            <span className="lp-score">14h</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </section>
                        <section
                            style={{
                                "--section-accent": "#135BEC",
                                "--section-pill-bg": "#EEF4FF"
                            }}
                        >
                            <div className="section-header">

                                <div className="section-header-left">
                                    <div className="section-icon-pill">✏️</div>

                                    <div className="section-title-wrap">
                                        <span className="section-title-tag">
                                            <i className="fa fa-users"></i> Share with learners
                                        </span>

                                        <span className="section-title-main">
                                            Community
                                        </span>
                                    </div>
                                </div>

                                <a href="my-posts" className="view-link"><span>My Posts</span> <i class="fa-solid fa-chevron-right"></i></a>

                            </div>

                            <div className="community-wrap">
                                <div>
                                    {document.cookie ? <DangTai
                                        acc={acc}
                                        handlePostBaiDang={handlePostBaiDang}
                                        handleChange={handleChange}
                                        images={images}
                                        showImage={showImage}
                                        handleRemoveImage={handleRemoveImage}
                                        dataUpToServer={dataUpToServer}
                                        setDataUpToServer={setDataUpToServer}
                                    /> : <></>}

                                    {/* Hiển thị các bài đăng */}
                                    <Feed listPost={listPost} loadPagination={loadPagination} pageInfo={pageInfo} />
                                </div>
                                <div className="d-flex flex-column px-2">
                                    <img src={banner}></img>
                                    <img src="https://photo.znews.vn/w660/Uploaded/ngogtn/2021_07_19/elsa_dress.jpeg"></img>
                                </div>
                            </div>
                        </section>
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
export default Home;