import "./quizDashBoard.css";
export default function QuizDashBoard() {
    return (
        <>
            <div>
                <div className="main-content">
                    <nav className="topnav">
                        <div className="topnav-left">
                            <div className="topnav-greeting">
                                Good afternoon, <span>Minh Vũ</span> 👋
                            </div>
                            <div className="topnav-status">Keep up the great progress!</div>
                        </div>

                        <div className="topnav-right">
                            <div className="topnav-search">
                                <i className="fas fa-search"></i>
                                <input type="text" placeholder="Search..." />
                            </div>

                            <div className="topnav-icons">
                                <button className="icon-btn">
                                    <i className="fas fa-bell"></i>
                                </button>
                                <button className="icon-btn">
                                    <i className="fas fa-question-circle"></i>
                                </button>
                            </div>
                        </div>
                    </nav>

                    <div className="content-area">
                        <div className="content-header">
                            <div className="content-header-top">
                                <div>
                                    <h1 className="content-title">Tổng Quan Năng Lực</h1>
                                    <p className="content-subtitle">
                                        Sinh viên: <strong>Nguyễn Minh Vũ</strong> | Lớp: 66 CNTT2
                                    </p>
                                </div>

                                <button className="btn-test-primary">
                                    <i className="fas fa-play-circle"></i> Trình độ: B1+
                                </button>
                            </div>
                        </div>

                        <div className="stats-grid">
                            
                            <div className="stat-card">
                                <div className="stat-label">📚 Lessons Completed</div>
                                <div className="stat-value">24/35</div>
                                <div className="stat-desc">68% done</div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-label">🎯 Tests Taken</div>
                                <div className="stat-value">8/10</div>
                                <div className="stat-desc">2 pending</div>
                            </div>
                        </div>

                        <div className="dashboard-grid">
                            <div>
                                <div className="summary-box">
                                    <div className="summary-title">
                                        <i className="fas fa-chart-line"></i> Phân tích kỹ năng
                                    </div>
                                    <div className="summary-text">
                                        Năng lực <span className="summary-highlight">Nghe</span> đạt mức tốt (B2). Tuy nhiên, kỹ năng{" "}
                                        <span className="summary-highlight">Viết</span> cần được ưu tiên cải thiện.
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title">Phân tích kỹ năng (Đơn vị: %)</div>
                                    </div>

                                    {[
                                        { name: "🎧 Nghe", value: 85 },
                                        { name: "📖 Đọc", value: 70 },
                                        { name: "✍️ Viết", value: 45 },
                                        { name: "🗣️ Nói", value: 60 },
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className="progress-section"
                                            style={index === 3 ? { marginBottom: 0 } : {}}
                                        >
                                            <div className="progress-label">
                                                <span className="progress-name">{item.name}</span>
                                                <span className="progress-percent">{item.value}%</span>
                                            </div>

                                            <div className="progress-bar">
                                                <div
                                                    className="progress-fill"
                                                    style={{ width: `${item.value}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}

                                    <p
                                        style={{
                                            fontSize: "12px",
                                            color: "var(--text-mid)",
                                            marginTop: "16px",
                                            paddingTop: "16px",
                                            borderTop: "1px solid var(--border)",
                                        }}
                                    >
                                        <strong>Nhận xét hệ thống:</strong> Năng lực Nghe đạt mức tốt (B2). Tuy nhiên, kỹ năng Viết cần cải thiện.
                                    </p>
                                </div>

                                <div className="card" style={{ marginTop: "20px" }}>
                                    <div className="card-header">
                                        <div className="card-title">Lộ trình đề xuất</div>
                                    </div>

                                    <div className="timeline">
                                        <div className="timeline-item completed">
                                            <div className="timeline-bar"></div>
                                            <div className="timeline-dot">✓</div>
                                            <div className="timeline-content">
                                                <div className="timeline-title">Chương 1</div>
                                                <div className="timeline-desc">Writing nâng cao</div>
                                                <span className="badge">Completed</span>
                                            </div>
                                        </div>

                                        <div className="timeline-item active">
                                            <div className="timeline-bar"></div>
                                            <div className="timeline-dot">2</div>
                                            <div className="timeline-content">
                                                <div className="timeline-title">Chương 2</div>
                                                <div className="timeline-desc">Speaking AI</div>
                                                <span className="badge">In Progress</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}