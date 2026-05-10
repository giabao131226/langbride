import PostCard from "../PostCard/post-card";
import {
    FaHeart,
    FaRegComment,
    FaBookmark,
    FaShareNodes
} from "react-icons/fa6";


export default function Feed({ listPost, loadPagination,pageInfo }) {
    return (
        <>
            <div className="feed">
                {listPost.map((item, index) => <PostCard key={index} item={item} />)}
                <div className="post-card">

                    <div className="post-header">
                        <img
                            className="post-avatar"
                            src="https://i.pravatar.cc/150?img=20"
                            alt=""
                        />
                        <div className="post-meta">
                            <p className="post-name">
                                Sophie Chen{" "}
                                <span
                                    style={{
                                        fontSize: "11px",
                                        color: "var(--text-light)",
                                        fontWeight: 500
                                    }}
                                >
                                    · Level 18
                                </span>
                            </p>
                            <p className="post-info">
                                🇨🇳 Chinese · 🇫🇷 French learner
                            </p>
                        </div>
                        <span className="post-time">2 min ago</span>
                    </div>

                    <span className="post-tag tag-milestone">
                        🎉 Milestone
                    </span>

                    <p className="post-text">
                        Just finished my <strong>100th lesson</strong> on LangBridge! 🥳
                        Starting Japanese felt impossible 6 months ago — now I can hold a
                        basic conversation. If you're just starting out, keep pushing.
                        The plateau is real but so is the breakthrough.
                        <strong> #JapaneseJourney #LangBridge</strong>
                    </p>

                    <div className="post-footer">

                        <button className="post-action-btn liked">
                            <FaHeart />
                            <span className="cnt">142</span>
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

                {/* Post 2 */}
                <div className="post-card">
                    <div className="post-header">

                        <img
                            className="post-avatar"
                            src="https://i.pravatar.cc/150?img=32"
                            alt=""
                        />

                        <div className="post-meta">

                            <p className="post-name">
                                Yuki Tanaka{" "}
                                <span
                                    style={{
                                        fontSize: "11px",
                                        background: "#EEF4FF",
                                        color: "var(--primary)",
                                        padding: "1px 7px",
                                        borderRadius: "20px",
                                        fontWeight: 700
                                    }}
                                >
                                    Tutor ✓
                                </span>
                            </p>

                            <p className="post-info">
                                🇯🇵 Native Japanese Speaker
                            </p>

                        </div>

                        <span className="post-time">15 min ago</span>

                    </div>

                    <span className="post-tag tag-tip">
                        💡 Vocabulary Tip
                    </span>

                    <p className="post-text">
                        One of the most confusing words for beginners —
                        let's break it down:
                    </p>

                    <div className="post-vocab">

                        <div className="word">
                            食べる <span className="reading">（たべる）</span>
                        </div>

                        <div className="meaning">
                            → to eat
                        </div>

                        <div
                            style={{
                                marginTop: "6px",
                                fontSize: "12px",
                                color: "var(--text-mid)"
                            }}
                        >
                            Example: <em>毎朝ご飯を食べる。</em> — I eat rice every morning.
                        </div>

                    </div>

                    <p
                        className="post-text"
                        style={{ marginBottom: 0 }}
                    >
                        Remember: <strong>る</strong> at the end often signals a{" "}
                        <em>Godan</em> or <em>Ichidan</em> verb.
                        Context is key! 🍱
                    </p>

                    <div
                        className="post-footer"
                        style={{ marginTop: "12px" }}
                    >

                        <button className="post-action-btn">
                            <FaHeart />
                            <span className="cnt">89</span>
                        </button>

                        <button className="post-action-btn">
                            <FaRegComment />
                            <span className="cnt">24</span>
                        </button>

                        <button className="post-action-btn">
                            <FaShareNodes />
                            <span className="cnt">41</span>
                        </button>

                        <span className="post-footer-sep"></span>

                        <button className="post-save-btn">
                            <FaBookmark />
                        </button>

                    </div>

                </div>

                {/* Post 3 */}
                <div className="post-card">

                    <div className="post-header">

                        <img
                            className="post-avatar"
                            src="https://i.pravatar.cc/150?img=45"
                            alt=""
                        />

                        <div className="post-meta">

                            <p className="post-name">
                                Hana Yamamoto
                            </p>

                            <p className="post-info">
                                🇰🇷 Korean · 🇯🇵 Japanese learner
                            </p>

                        </div>

                        <span className="post-time">1 hr ago</span>

                    </div>

                    <span className="post-tag tag-question">
                        ❓ Question
                    </span>

                    <p className="post-text">
                        Hey everyone! I'm struggling with Korean particles —
                        specifically the difference between
                        <strong> 은/는 </strong>
                        and
                        <strong> 이/가</strong>.
                        I understand they're both "topic" vs "subject"
                        markers but can't feel the nuance in real speech yet.
                        Can any fluent speakers share examples from daily
                        conversation? 🙏
                    </p>

                    <img
                        className="post-image"
                        src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&q=70"
                        alt="Study"
                    />

                    <div className="post-footer">

                        <button className="post-action-btn">
                            <FaHeart />
                            <span className="cnt">56</span>
                        </button>

                        <button className="post-action-btn">
                            <FaRegComment />
                            <span className="cnt">31</span>
                        </button>

                        <button className="post-action-btn">
                            <FaShareNodes />
                            <span className="cnt">7</span>
                        </button>

                        <span className="post-footer-sep"></span>

                        <button className="post-save-btn">
                            <FaBookmark />
                        </button>

                    </div>

                </div>


                <div className="pagination d-flex items-center justify-center gap-x-3">
                    {Object.keys(pageInfo).length > 0 ? loadPagination(pageInfo.firstPage, pageInfo.lastPage) : <></>}
                </div>
            </div>
        </>
    )
}