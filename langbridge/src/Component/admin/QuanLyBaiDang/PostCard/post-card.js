
export default function PostCard({ item,setDataModal,openModal }) {
    function getTag(tag){
        if(tag == "question") return "❓ Question";
        else if(tag == "tip") return "💡 Tip";
        else if(tag == "milestone") return "🎉 Milestone";
        else if(tag == "vocabulary") return "📝 Vocabulary";
        else if(tag == "speaking") return "🎙️ Speaking";
        return "📖 Resource";
    }
    return (
        <>
            <div className="post-item" id="post-1">

                <div className="col-content">
                    <div className="post-info">

                        <div className="avatar-square" style={{overflow: "hidden"}}>
                            <img src={"http://localhost:5000" +item.IDAccount.avatar} style={{width: "100%"}}></img>
                        </div>

                        <div>
                            <p className="post-title" dangerouslySetInnerHTML={{__html:item.conTent}}>
                                
                            </p>

                            <p className="post-meta">
                                {item.updateAt ? item.updateAt : item.createAt}
                            </p>
                        </div>

                    </div>
                </div>

                <div className="col-mod">
                    <span
                        style={{
                            fontWeight: 600,
                            fontSize: "14px"
                        }}
                    >
                        {item.IDAccount.userName}
                    </span>
                </div>

                <div className="col-action">
                    <span className="status-tag">
                        {getTag(item.tag)}
                    </span>
                </div>

                <div className="col-details" onClick={() => {
                    setDataModal(item);
                    openModal();
                }}>
                    <span
                        className="view-link"
                    >
                        VIEW DETAILS
                        <i className="fa-solid fa-chevron-right"></i>
                    </span>
                </div>

            </div>
        </>
    )
}