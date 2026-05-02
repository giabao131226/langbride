import "./result.css"

export default function Result() {

    const result = JSON.parse(localStorage.getItem("dataMark")) || {}


    return (
        <>
            <div className="container-fluid text-align-start result-container">
                <div className="container d-flex flex-column">
                    <div class="result-top col-12 px-0 py-0">

                        <div class="result-left col-6 px-0 py-0">
                            <h1>🎉 Congratulations!</h1>
                            <p>You have completed the test.</p>

                            <button onclick="goHome()">Go to Home Page</button>
                        </div>


                        <div class="result-right col-6 px-0 py-0">
                            <h3>Your Score</h3>
                            <h1 id="score">{result.mark}/10</h1>

                            <div class="details">
                                <p>Correct Answers:</p>
                                <span className="font-bold">{result.countCorrect}</span>
                            </div>

                            <div class="details">
                                <p>Total Questions:</p>
                                <span className="font-bold">{result.totalQuestion}</span>
                            </div>
                        </div>

                    </div>
                    <div class="courses">
                        <h2>Recommended Courses</h2>

                        <div class="course-list">

                            <div class="course-card">
                                <h4>Basic English</h4>
                                <p>Improve your foundation skills.</p>
                            </div>

                            <div class="course-card">
                                <h4>Intermediate Grammar</h4>
                                <p>Boost your grammar knowledge.</p>
                            </div>

                            <div class="course-card">
                                <h4>Advanced Reading</h4>
                                <p>Master reading comprehension.</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}