import {
    FaHeart,
    FaRegComment,
    FaBookmark,
    FaShareNodes
} from "react-icons/fa6";
import { Image } from 'antd';
import "./post-card.css";
import { useState } from "react";

export default function PostCard({item}) {
    const [totalLike,setToTalLike] = useState(item.totalLike);
    
    function getPropertyLevel(level = "") {
        if (level == "" || level == "Beginner") return "text-beginner";
        else if (level == "Elementary") return "text-elementary";
        else if (level == "Intermediate") return "text-intermediate";
        else if (level == "Advanced") return "text-ddvanced";
        return "text-master";
    }

    function getTag(tag){
        if(tag == "question") return "❓ Question";
        else if(tag == "tip") return "💡 Tip";
        else if(tag == "milestone") return "🎉 Milestone";
        else if(tag == "vocabulary") return "📝 Vocabulary";
        else if(tag == "speaking") return "🎙️ Speaking";
        return "📖 Resource";
    }

    function handleLike(e,id){
        e.target.classList.toggle("liked");

        
        // fetch("http://localhost:5000/post/like-post")
    }

    return (
        <>
            <div className="post-card">

                <div className="post-header">

                    <img
                        className="post-avatar"
                        src={"http://localhost:5000" + item.userDetail.avatar}
                        alt=""
                    />

                    <div className="post-meta">

                        <p className="post-name">
                            {item.userDetail.userName + "  "}
                            <span className={"font-11 font-bold px-2 py-1 rounded " + getPropertyLevel(item.level)} style={{ background: "#EEF4FF" }}>{item.level ? item.level : "Beginner"}</span>
                        </p>

                        <p className="post-info">
                            🇨🇳 Chinese · 🇫🇷 French learner
                        </p>

                    </div>

                    <span className="post-time">{item.createAt}</span>

                </div>

                <span className="post-tag tag-milestone">
                    {item.tag ? getTag(item.tag) : "❓ Question"}
                </span>

                <p className="post-text" dangerouslySetInnerHTML={{ __html: item.conTent }}>
                </p>

                {item.images ? <div className="post-card-image">
                    {item.images.map((image, index) => <Image width={"50%"} alt="ảnh của bài đăng" src={"http://localhost:5000"+image.url} />)}
                </div> : <></>}

                <div className="post-footer">

                    <button className="post-action-btn" onClick={(e) => {
                        
                        handleLike(e,item._id);
                        
                        }}>
                        <FaHeart />
                        <span className="cnt">{item.totalLike}</span>
                    </button>

                    <button className="post-action-btn">
                        <FaRegComment />
                        <span className="cnt">38</span>
                    </button>

                    <button className="post-action-btn">
                        <FaShareNodes />
                        <span className="cnt">12</span>
                    </button>

                    <span className="post-footer-sep"></span>

                    <button className="post-save-btn">
                        <FaBookmark />
                    </button>

                </div>

            </div>
        </>
    )
}