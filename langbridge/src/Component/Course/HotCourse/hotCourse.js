
import { IoDocumentOutline } from "react-icons/io5";



import { Rate } from 'antd';



import "../course.css"

function HotCourse() {
    return (
        <>
            

            <div className="col-4 px-2 py-2 bg-white d-flex flex-column justify-center items-center rounded-lg">
                <img src="https://wp.rrdevs.net/edcare/wp-content/uploads/2026/02/course-23-img-2.png" className="HotCourseBanner"></img>

                <div className="bg-white col-12">
                    <div className="HotCourseDetail">
                        <span className="m-0 px-2 py-1 bg-gray rounded-5 font-11 font-bold text-white ">EngLish Instructor</span>
                        <p className="m-0 font-bold py-1">Name Course</p>

                        <div className="d-flex items-center gap-x-1 py-1">
                            <IoDocumentOutline />
                            <span className="font-bold text-gray-200">14 Lesson</span>
                        </div>

                        <div className="HotInstructorDetail d-flex items-center justify-between">
                            <div className="d-flex items-center gap-x-2">
                                <div className="vienimg">
                                    <img src="https://wp.rrdevs.net/edcare/wp-content/uploads/2024/12/team-9.jpg"></img>
                                </div>

                                <div>
                                    <p className="m-0 font-bold font-14">Kevin Perry</p>
                                    <p className="m-0 font-11 font-bold text-gray-200">Instructor</p>
                                </div>
                            </div>
                            <div>
                                <Rate size="small" value={4} /> (0)
                            </div>
                        </div>
                    </div>
                    <div className="d-flex items-center justify-between py-2">
                        <p className="m-0 font-bold">$ 99.00</p>
                        <button className="rounded-5 px-3 py-1 border-none bg-gray font-bold cursor-pointer">View Details</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default HotCourse