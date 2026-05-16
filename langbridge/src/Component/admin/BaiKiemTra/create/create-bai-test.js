import { useState } from "react";
import "./create.css";
import { notification } from "antd"

export default function CreateBaiTest() {
    const [testDetail, setTestDetail] = useState({});
    const [questionDetail, setQuestionDetail] = useState({});
    const [questionType, setQuestionType] = useState("mc");
    const [totalQuestion, setToTalQuestion] = useState(1);
    const [totalAnswer, setTotalAnswer] = useState(4);
    const [optionCorrect, setOptionCorrect] = useState("option-A");
    const [numberQuestion, setNumberQuestion] = useState(1);
    const [statusModal, setStatusModal] = useState(false);
    const [listQuestion, setListQuestion] = useState([]);

    //Gía trị khởi tạo của Test và question
    const initialTestDetail = {
        title: "",
        language: ""
    };

    const initialQuestionDetail = {
        title: "",
        answer: []
    };

    const [api, contextHolder] = notification.useNotification();

    function resetData() {
        setOptionCorrect("option-A");
        setTotalAnswer(4);
        setQuestionType("mc");
        setQuestionDetail({
            title: "",
            answer: []
        });
        const questionPrompt = document.querySelector(".question-input");
        if (questionPrompt) {
            questionPrompt.value = "";
        }
        const listAnswer = document.querySelectorAll(".answer-input");
        if (listAnswer.length > 0) {
            listAnswer.forEach((item) => item.value = "");
        }
    }

    function resetDataAfterCreate() {
        setTestDetail(initialTestDetail);

        setQuestionDetail(initialQuestionDetail);
        setQuestionType("mc");
        setToTalQuestion(1);
        setTotalAnswer(4);
        setListQuestion([]);
        setOptionCorrect("option-A");
        setNumberQuestion(1);
    }

    function renderNumberQuestion(totalQuestion) {
        const list = []
        for (var i = 1; i <= totalQuestion; i++) {
            list.push(<button key={i}
                onClick={(e) => {
                    const index = e.target.getAttribute("id");
                    setNumberQuestion(index)
                }}
                id={i} className={"nav-btn saved " + ((i == numberQuestion) ? "active" : "")}>
                {(i < 10 ? ("0" + i) : i)}
            </button>)
        }
        return list;
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setTestDetail({ ...testDetail, [name]: value });
    }

    function handleChangeValueAnswer(e) {
        if (questionType == "mc") {
            const { name, value } = e.target;
            if (questionDetail.hasOwnProperty("answer")) {
                const index = questionDetail.answer.findIndex((item) => item.name == name);
                if (index != -1) {
                    const newList = [...questionDetail.answer];
                    newList[index] = {
                        ...newList[index],
                        title: value
                    }
                    setQuestionDetail({ ...questionDetail, "answer": newList });
                } else {
                    const newList = [...questionDetail.answer];
                    newList.push({ "name": name, title: value, isCorrect: false });
                    setQuestionDetail({ ...questionDetail, "answer": newList });
                }
            } else {
                setQuestionDetail({ ...questionDetail, "answer": [{ "name": name, title: value, isCorrect: false }] });
            }
        } else {
            setQuestionDetail({
                ...questionDetail,
                answer: [
                    {
                        title: e.target.value,
                        isCorrect: true
                    }
                ]
            })
        }
    }

    function handleChangeCorrectAnswer(e) {
        const name = e.target.getAttribute("id");
        setOptionCorrect(name);
        if (questionDetail.answer) {
            const index = questionDetail.answer.findIndex((item) => item.name == name);
            const newList = [...questionDetail.answer];
            for (var i = 0; i < newList.length; i++) {
                if (newList[i].isCorrect) newList[i].isCorrect = false;
            }
            if (index != -1) {
                newList[index].isCorrect = true;
                setQuestionDetail({ ...questionDetail, answer: newList });
            } else {
                newList.push({ "name": name, title: "", isCorrect: true });
                setQuestionDetail({ ...questionDetail, answer: newList });
            }
        } else setQuestionDetail({ ...questionDetail, answer: [{ "name": name, title: "", isCorrect: true }] })
    }

    function handleChangeQuestionType() {
        if (questionType == "mc") setQuestionType("sa");
        else setQuestionType("mc");
    }

    function renderOptionCorrectAnswer(n) {
        const list = [];
        for (var i = 0; i < n; i++) {
            var char = String.fromCharCode(65 + i);
            list.push(<button className={"correct-btn " + (optionCorrect == (`option-${char}`) ? "active" : "")} id={`option-${char}`} onClick={handleChangeCorrectAnswer}>
                Option {char}
            </button>
            )
        }
        return list;
    }

    function renderAnswer(n) {
        const list = [];
        for (var i = 0; i < n; i++) {
            var char = String.fromCharCode(65 + i);
            list.push(
                <div className="answer-item" key={i}>
                    <div className="answer-letter">
                        {char}
                    </div>
                    <input
                        name={`option-${char}`}
                        className="answer-input"
                        placeholder={`Option ${char}...`}
                        onChange={handleChangeValueAnswer}
                    />
                </div>
            )
        }
        return list;
    }

    function handleSaveQuestion() {
        let dataAnswer;
        if (questionType == "mc") {
            dataAnswer = questionDetail.answer.map((item) => {
                if (item.name == optionCorrect) item.isCorrect = true;
                return item;
            })
        } else {

            dataAnswer = questionDetail.answer;
            dataAnswer.isCorrect = true;
        };

        const dataQuestion = {
            "title": questionDetail.title,
            "answer": dataAnswer,
            "language": testDetail.language,
            "index": numberQuestion
        }

        let newListQuestion = [];
        if (Array.isArray(testDetail.listQuestion)) {
            newListQuestion = [...testDetail.listQuestion];
        }
        const index = newListQuestion.findIndex((item) => item.index == numberQuestion);
        if (index != -1) newListQuestion[index] = dataQuestion;
        else newListQuestion.push(dataQuestion);
        setTestDetail({ ...testDetail, listQuestion: newListQuestion });
        resetData();
    }

    function handleCreateTest() {
        console.log(testDetail);
        const timeLimit = document.querySelector(".time-input").value;
        const dataUpToServer = {
            "testName": testDetail.testName,
            "level": testDetail.level,
            "timeLimit": timeLimit,
            "totalQuestion": totalQuestion,
            "language": testDetail.language,
            "question": testDetail.listQuestion
        };
        console.log(dataUpToServer);
        fetch("http://localhost:5000/admin1/quan-ly-bai-dang/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataUpToServer)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    api.info({
                        "title": "Thông Báo",
                        description: "Tạo bài test thành công"
                    })
                    resetDataAfterCreate();
                } else {
                    api.info({
                        "title": "Thông Báo",
                        description: data.message
                    })
                }
            })
            .catch(err => {
    console.log("FETCH ERROR:", err);
})
    }

    return (
        <>
            {contextHolder}
            <div className="container-fluid text-align-start d-flex justify-center">
                <div className="container">
                    <div className="layout">

                        <div className="main-content">
                            <div className="card">
                                <div className="type-selector-wrap">

                                    <div className="section-label">
                                        Question Type
                                    </div>

                                    <div className="type-tabs">

                                        <div className={"type-tab" + (questionType == "mc" ? " active" : "")} onClick={handleChangeQuestionType}>
                                            Multiple Choice
                                        </div>

                                        <div className={"type-tab" + (questionType == "sa" ? " active" : "")} onClick={handleChangeQuestionType}>
                                            Short Answer
                                        </div>

                                        <div className={"tab-slider" + (questionType == "sa" ? " tab-slider-sa" : " tab-slider-left")}></div>

                                    </div>

                                </div>

                                <div className="section-label">
                                    Question Prompt
                                </div>

                                <textarea
                                    onChange={(e) => {
                                        setQuestionDetail({ ...questionDetail, title: e.target.value })
                                    }}
                                    className="question-input"
                                    placeholder="Type your scholarly question here..."
                                ></textarea>

                                <div>

                                    <div
                                        className="answers-header"
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginBottom: "12px"
                                        }}
                                    >

                                        <div
                                            className="section-label"
                                            style={{ margin: 0 }}
                                        >
                                            Answers
                                        </div>

                                        <div className="count-selector">

                                            <span
                                                style={{
                                                    fontSize: "10px",
                                                    fontWeight: 700,
                                                    marginRight: "8px"
                                                }}
                                            >
                                                OPTIONS:
                                            </span>

                                            <button
                                                className={"count-btn " + (totalAnswer == 2 ? "active" : "")}
                                                onClick={() => { setTotalAnswer(2) }}
                                            >
                                                2
                                            </button>

                                            <button
                                                className={"count-btn " + (totalAnswer == 3 ? "active" : "")}
                                                onClick={() => { setTotalAnswer(3) }}
                                            >
                                                3
                                            </button>

                                            <button
                                                className={"count-btn " + (totalAnswer == 4 ? "active" : "")}
                                                onClick={() => { setTotalAnswer(4) }}
                                            >
                                                4
                                            </button>

                                        </div>

                                    </div>

                                    <div className="answer-list">
                                        {questionType == "mc" ?
                                            renderAnswer(totalAnswer) :
                                            <>
                                                <input type="text" className="question-input" id="shortAnsVal" style={{ marginBottom: "0px" }} placeholder="Correct answer phrase..." onChange={handleChangeValueAnswer}></input>
                                            </>}
                                    </div>
                                </div>

                                <div className={"correct-answer-section " + (questionType == "sa" ? "d-none" : "d-block")}>
                                    <div
                                        className="section-label"
                                        style={{ marginBottom: "10px" }}>
                                        <span className="correct-label-icon">
                                            ⚙
                                        </span>{" "}
                                        Set Correct Answer
                                    </div>

                                    {/* Render ra các option correct */}
                                    <div className="correct-btn-row">
                                        {renderOptionCorrectAnswer(totalAnswer)}
                                    </div>
                                    {/* end */}

                                </div>

                                <div className="actions">
                                    <div className="left-actions">
                                        <button className="btn-preview" onClick={() => { setStatusModal(true) }}>
                                            Preview
                                        </button>
                                    </div>

                                    <button className="btn-save" onClick={handleSaveQuestion}>
                                        Save Question
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="sidebar-test">
                            <div className="sidebar-card">
                                <div className="sidebard-header">
                                    <div className="sidebar-text">
                                        <div className="sidebar-title">
                                            Test Detail
                                        </div>
                                        <div className="d-flex flex-column py-2">
                                            <div className="d-flex flex-column">
                                                <label className="font-bold font-14 py-1">Test Name</label>
                                                <input type="text" name="testName" placeholder="Enter test name" className="px-2 py-2" style={{ borderRadius: "6px" }} onChange={handleChange}></input>
                                            </div>
                                            <div className="d-flex flex-column">
                                                <label className="font-bold font-14 py-1">Level</label>
                                                <select name="level" onChange={handleChange}>
                                                    <option>Select Level</option>
                                                    <option value={"easy"}>Easy</option>
                                                    <option value={"medium"}>Medium</option>
                                                    <option value={"hard"}>Hard</option>
                                                    <option value={"expert"}>Expert</option>
                                                </select>
                                            </div>
                                            <div className="d-flex flex-column">
                                                <label className="font-bold font-14 py-1">Language</label>
                                                <select name="language" onChange={handleChange}>
                                                    <option>Select Language</option>
                                                    <option value={"english"}>English</option>
                                                    <option value={"chinese"}>Chinese</option>
                                                    <option value={"korea"}>Korea</option>
                                                    <option value={"japanese"}>Japanese</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="sidebar-card">
                                <div className="sidebar-header">
                                    <div className="sidebar-icon nav-icon-bg">
                                        📋
                                    </div>
                                    <div className="sidebar-text">
                                        <div className="sidebar-title">
                                            Navigator
                                        </div>

                                        <div className="sidebar-sub">
                                            {totalQuestion} Questions Total
                                        </div>
                                    </div>
                                    <div className="nav-actions">
                                        <button
                                            className="nav-action-btn delete"
                                            title="Delete Current"
                                            onClick={() => { setToTalQuestion(totalQuestion - 1) }}
                                        >
                                            -
                                        </button>

                                        <button
                                            className="nav-action-btn add"
                                            title="Add New"
                                            onClick={() => { setToTalQuestion(totalQuestion + 1) }}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="nav-grid">
                                    {renderNumberQuestion(totalQuestion)}

                                </div>

                            </div>

                            <div className="sidebar-card">
                                <div className="sidebar-header">
                                    <div className="sidebar-icon settings-icon-bg">
                                        🕐
                                    </div>
                                    <div className="sidebar-text">
                                        <div className="sidebar-title">
                                            Test Settings
                                        </div>

                                        <div className="sidebar-sub uppercase">
                                            TIME LIMIT
                                        </div>
                                    </div>
                                </div>

                                <div className="time-input-wrap">

                                    <input
                                        type="number"
                                        className="time-input"
                                        defaultValue={60}
                                        min="1"
                                        max="999"
                                    />

                                    <span className="time-unit">
                                        MIN
                                    </span>

                                </div>

                            </div>

                            <button className="btn-finish" onClick={handleCreateTest}>
                                Finish Exam
                            </button>

                        </div>

                    </div>
                    {statusModal ?
                        <div className="modal">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <div className="preview-header-title">
                                        Quiz Preview
                                    </div>
                                    <button className="close-modal" onClick={() => { setStatusModal(false) }}>
                                        &times;
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {testDetail.listQuestion ? testDetail.listQuestion.map((item) => <div className="preview-card">
                                        <div className="preview-q-meta">
                                            QUESTION #{item.index < 10 ? ("0" + item.index) : item.index}
                                        </div>
                                        <div className="preview-q-text">
                                            {item.title}
                                        </div>

                                        <div className="preview-ans-list">
                                            {Array.isArray(item.answer) &&
                                                item.answer.map((ans, index) => (
                                                    <div
                                                        key={index}
                                                        className={
                                                            "preview-ans-item " +
                                                            (ans.isCorrect ? "correct-ans" : "")
                                                        }
                                                    >
                                                        {String.fromCharCode(index + 65)}. {ans.title}
                                                    </div>
                                                ))}
                                        </div>
                                    </div>) : <></>}
                                </div>
                            </div>
                        </div> : <></>}
                </div>
            </div >
        </>
    )
}