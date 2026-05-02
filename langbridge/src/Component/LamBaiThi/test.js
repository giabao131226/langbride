
import { useCallback, useEffect, useState } from "react";
import "./test.css"
import { Outlet, useNavigate } from "react-router-dom";

function Test() {
    const [question, setQuestion] = useState([])
    const [answerSelect, setAnswerSelect] = useState([])
    const [percentDone, setPercentDone] = useState(0)

    const navigate = useNavigate()

    // Thời gian làm bài
    let [minute, setMinute] = useState(60)
    let [second, setSecond] = useState(0)
    // 

    // Hàm Tính toán phần trăm hoàn thành
    const updateProgress = useCallback((done) => {
        let percent = (done / question.length) * 100;
        setPercentDone(percent)
    })
    //  

    // Hàm chọn đáp án
    function selectAnswer(questionID, value, indexQ) {
        const newObject = [...answerSelect]
        const index = newObject.findIndex((item) => item.questionID == questionID)
        if (index >= 0) {
            newObject[index].tieuDe = value
            setAnswerSelect(newObject);
            return;
        }
        const newData = [...answerSelect, { "questionID": questionID, "tieuDe": value, "index": indexQ }]
        setAnswerSelect(newData)
        updateProgress(newData.length);
    }
    // 

    //Hàm đếm thời gian
    const timerEl = document.getElementById("time");
    if (timerEl) {
        setInterval(() => {
                second -= 1;
                if (second < 0) {
                    minute -= 1;
                    second = 59;
                }
                if (minute == 0 && second <= 0) {
                    submitTest();
                }
                if(minute>=0)timerEl.innerText = `${minute < 10 ? "0" + minute : minute}:${second < 10 ? "0" + second : second}`;
        }, 1000);
    }
    //End hàm đếm thời gian

    // submit
    const submitTest = useCallback((e) => {
        const user = JSON.parse(localStorage.getItem("user"))

        const data = {
            "userID": user.id,
            "answer": answerSelect,
            "submitAt": new Date(),
            "totalQuestion": question.length
        }

        fetch("http://localhost:5000/test/submit", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(data)

        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    localStorage.setItem("dataMark", JSON.stringify(data))
                    navigate("/quiz/result")
                }
            })
    }, [answerSelect])
    // 

    useEffect(() => {
        fetch(`http://localhost:5000/test/get-exam/1`)
            .then(res => res.json())
            .then(async (data) => {
                if (data.success) {
                    const listCauHoi = data.data;
                    const listQuestionAndAnswer = await Promise.all(
                        listCauHoi.map(async (item) => {
                            const res = await fetch(`http://localhost:5000/test/get-answer/${item._id}`)
                            const data = await res.json();
                            return {
                                ...item,
                                answer: data.success ? data.listAnswer : []
                            }
                        })
                    )
                    setQuestion(listQuestionAndAnswer)
                }
            })
    }, [])


    return (
        <>
            <Outlet />
            <div className="test container-fluid text-align-start d-flex justify-center">
                <div className="testContainer">

                    {/* Left */}
                    <div className="left">

                        <div className="header">
                            <div>
                                <p className="tag m-0">ENGLISH SKILLS</p>
                                <h2 className="m-0">Quick Test</h2>
                                <div className="badge">Intermediate Level</div>
                            </div>

                            <div className="timer">
                                ⏱ <span id="time"></span>
                                
                            </div>
                        </div>

                        <div className="col-12 d-flex flex-column items-center gap-y-4">
                            {question.map((item, indexQ) => (
                                <div key={item._id} className="question bg-white" id={`question${indexQ + 1}`}>
                                    <div>
                                        <p className="m-0 font-bold text-red">
                                            Question {indexQ + 1 < 10 ? `0${indexQ + 1}` : indexQ + 1}
                                        </p>
                                        <p className="m-0 font-bold">{item.deBai}</p>
                                    </div>
                                    <div className="rows justify-center gap-x-2">
                                        {item.answer.map((answer, index) => (
                                            <button
                                                key={answer.id}
                                                className={`answer d-flex items-center gap-x-2 col-5 ${answerSelect.find(item => item.index === indexQ && item.tieuDe === answer.tieuDe)
                                                    ? "active"
                                                    : ""
                                                    }`}
                                                onClick={() => {
                                                    selectAnswer(item._id, answer.tieuDe, indexQ)
                                                }}
                                            >
                                                <span className="bg-white px-2 py-2">
                                                    {String.fromCharCode(index + 65)}
                                                </span>
                                                <span
                                                    id={`answer${index + 1}`}
                                                    value={answer.tieuDe}
                                                >
                                                    {answer.tieuDe}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                    {/* End left */}
                    {/* Right */}
                    <div className="testOverview right d-flex flex-column gap-y-3">
                        <h4 className="m-0">Test Overview</h4>

                        <div className="stats">
                            <div>
                                <p className="m-0 py-2">Answered</p>
                                <h3 id="answered" className="m-0">{answerSelect.length}</h3>
                            </div>
                            <div>
                                <p className="m-0 py-2">Remaining</p>
                                <h3 id="remaining" className="m-0">{question.length - answerSelect.length}</h3>
                            </div>
                        </div>

                        <div className="numberList col-12 px-0 py-0 rows gap-x-4 justify-center">
                            {question.map((item, index) => (
                                <label
                                    key={item.id}
                                    onClick={() => {
                                        document
                                            .querySelector(`#question${index + 1}`)
                                            ?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                    className={`numberQ font-bold d-block ${answerSelect.find(item => item.index === index)
                                        ? "active"
                                        : ""}`}
                                    id={`numberQ${index + 1}`}
                                >
                                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                </label>
                            ))}
                        </div>

                        <div className="Progress col-12 px-0 py-0">
                            <div className="d-flex items-center justify-between py-2">
                                <span className="font-bold">PROGRESS</span>
                                <span className="font-bold">{percentDone}%</span>
                            </div>

                            <div className="progressPercentage">
                                <div className="progressDonePercentage" style={{ width: `${percentDone}%` }}>
                                </div>
                            </div>
                        </div>

                        <button
                            className="buttonSubmitTest cursor-pointer py-3 font-20 font-bold d-flex items-center justify-center text-white gap-x-2"
                            onClick={submitTest}
                        >
                            Submit <i className="fa-solid fa-paper-plane"></i>
                        </button>
                    </div>
                    {/* End Right */}
                </div>
            </div >
        </>
    )
}
export default Test;