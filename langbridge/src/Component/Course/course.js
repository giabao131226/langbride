import { MdElectricBolt } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { BsCameraVideoFill } from "react-icons/bs";
import { BsFillMicMuteFill } from "react-icons/bs";
import { FaPhone } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { FaLongArrowAltRight } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoDocumentOutline } from "react-icons/io5";



import { Rate } from 'antd';



import "./course.css"
import HotCourse from "./HotCourse/hotCourse";

function Course() {
    return (
        <>
            <div className="course">
                <div className="course__container">
                    <div className="d-flex items-center justify-between">
                        <div className="courseWelcome rows">
                            <div className="col-6 d-flex flex-column gap-y-3">
                                <div className="d-flex items-center bg-white gap-x-2 py-1 rounded-5 px-2 col-7">
                                    <div className="rounded-50 bg-gray px-2 py-2">
                                        < MdElectricBolt />
                                    </div>
                                    <span className="m-0 font-bold font-14">Welcome to Online Course</span>
                                </div>
                                <h1 className="m-0 font-normal font-30">
                                    <span className="font-bold text-white">World's Only E-School Built by</span>
                                    <span className="text-white"> Industry Leaders, for Future Leaders</span>
                                </h1>
                                <p className="m-0 text-white font-14">Tech-boosted pratical-first approach</p>

                                <div className="rows coureButton gap-x-3">
                                    <button className="font-11 bg-white font-bold px-3 py-3 rounded-5 d-flex items-center border-none">Apply Now <IoIosAdd /></button>
                                    <button className="font-11 bg-none font-bold px-3 py-3 rounded-5 d-flex items-center text-white">Download Brochure <IoIosAdd /></button>
                                </div>
                            </div>

                            <div className="col-6 coureWelcome__img relative d-flex">
                                <div className="coureWelcome__icon container d-flex items-center justify-center gap-x-4">
                                    <div className="courseTool bg-white px-2 py-2">
                                        < IoIosSettings />
                                    </div>
                                    <div className="courseTool bg-white px-2 py-2">
                                        < BsFillMicMuteFill />
                                    </div>
                                    <div className="courseTool bg-white px-2 py-2">
                                        < FaPhone />
                                    </div>
                                    <div className="courseTool bg-white px-2 py-2">
                                        < BsCameraVideoFill />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="CourseFeatures d-flex flex-column gap-y-4">
                        <div className="d-flex flex-column items-center gap-y-3">
                            <div className="d-flex items-center bg-white gap-x-2 py-1 rounded-5 px-2">
                                <div className="rounded-50 bg-gray px-2 py-2">
                                    < MdElectricBolt />
                                </div>
                                <span className="m-0 font-bold font-14">Our Features</span>
                            </div>
                            <h1 className="m-0">
                                Digital Art And Design Crafting
                            </h1>
                            <h1 className="m-0">
                                Art With Technology
                            </h1>
                        </div>
                        <div class="d-flex items-center col-12 gap-x-4">
                            <div className="CourseFeaturesBox d-flex flex-column items-center col-4 bg-white rounded-5 text-align-center gap-y-2">
                                <div className="vienimg">
                                    <img src="https://wp.rrdevs.net/edcare/wp-content/uploads/2024/12/feature-icon-1.png"></img>
                                </div>

                                <p className="m-0 font-bold">Accessibility & Flexibility</p>

                                <p className='m-0'>Online education should be accessible to learners from diverse backgrounds, offering the flexibility to study anytime.</p>

                                <button className="bg-white px-4 py-2 font-bold rounded-5 d-flex items-center gap-x-2 cursor-pointer">Learn More <FaLongArrowAltRight /></button>
                            </div>
                            <div className="CourseFeaturesBox d-flex flex-column items-center col-4 bg-white rounded-5 text-align-center gap-y-2">
                                <div className="vienimg">
                                    <img src="https://wp.rrdevs.net/edcare/wp-content/uploads/2024/12/feature-icon-2.png"></img>
                                </div>

                                <p className="m-0 font-bold">Personalized Learning</p>

                                <p className='m-0'>Online education should be accessible to learners from diverse backgrounds, offering the flexibility to study anytime.</p>

                                <button className="bg-white px-4 py-2 font-bold rounded-5 d-flex items-center gap-x-2 cursor-pointer">Learn More <FaLongArrowAltRight /></button>
                            </div>
                            <div className="CourseFeaturesBox d-flex flex-column items-center col-4 bg-white rounded-5 text-align-center gap-y-2">
                                <div className="vienimg">
                                    <img src="https://wp.rrdevs.net/edcare/wp-content/uploads/2024/12/feature-icon-3.png"></img>
                                </div>

                                <p className="m-0 font-bold">Accessibility & Flexibility</p>

                                <p className='m-0'>Online education should be accessible to learners from diverse backgrounds, offering the flexibility to study anytime.</p>

                                <button className="bg-white px-4 py-2 font-bold rounded-5 d-flex items-center gap-x-2 cursor-pointer">
                                    Learn More <FaLongArrowAltRight />

                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="OurPlatform">
                        <div className="d-flex items-center  gap-x-4">
                            <div className="vienimg col-5">
                                <img src="https://wp.rrdevs.net/edcare/wp-content/uploads/2024/12/about-img-4.png"></img>
                            </div>

                            <div className="col-7 d-flex flex-column gap-y-2">
                                <div className="header d-flex items-center bg-white gap-x-2 py-1 rounded-5 px-2 col-4">
                                    <div className="rounded-50 bg-gray px-1 py-1">
                                        < MdElectricBolt />
                                    </div>
                                    <span className="m-0 font-bold font-11">Our Platform</span>
                                </div>

                                <h1 className="m-0"><span>What People Think</span> <span>About Our Company</span></h1>

                                <p className="font-11 text-gray-600 m-0 py-2">Synergistically visualize alternative content before cross functional core Rapidiously administra standardized value via focused benefits. Rapidiously redefine highly efficient niche markets</p>

                                <div className="d-flex items-center justify-between col-12">
                                    <div className="d-flex flex-column items-start col-6 gap-y-2">
                                        <div className="d-flex gap-x-2">
                                            <div className="px-2 py-2 text-white bg-Course"><MdDone /></div>
                                            <div>
                                                <p className="m-0 font-bold">Competitive Rates</p>
                                                <p className="m-0 text-gray-200 font-14">Seamlessly envisioneer tactical
                                                    data through services.</p>
                                            </div>
                                        </div>

                                        <button className="font-bold text-white px-5 py-3 border-none rounded-5 bg-buttonCourse">Join With Us</button>
                                    </div>
                                    <div className="d-flex flex-column items-start col-6 gap-y-2">
                                        <div className="d-flex gap-x-2">
                                            <div className="px-2 py-2 text-white bg-Course"><MdDone /></div>
                                            <div>
                                                <p className="m-0 font-bold">Competitive Rates</p>
                                                <p className="m-0 text-gray-200 font-14">Seamlessly envisioneer tactical
                                                    data through services.</p>
                                            </div>
                                        </div>

                                        <button className="font-bold text-white px-5 py-3 border-none rounded-5 bg-buttonCourse">Join With Us</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="CourseOurTeacher">
                        <div>
                            <div className="CourseOurTeacherHeader d-flex flex-column justify-center gap-y-4 items-center">
                                <div className="d-flex items-center gap-x-2 py-1 rounded-5 px-2 bg-white">
                                    <div className="rounded-50 bg-gray px-1 py-1">
                                        < MdElectricBolt />
                                    </div>
                                    <span className="m-0 font-bold font-14">Our Instructors</span>
                                </div>
                                <h1 className="m-0">Study with a team of high-quality instructors</h1>
                            </div>

                            <div className="d-flex items-center justify-between">
                                <div className="Instructors rounded-lg overflow-hidden relative col-3 px-0 py-0">
                                    <img src="https://wp.rrdevs.net/edcare/wp-content/uploads/2024/12/team-1.png" className="rounded-lg col-12 px-0 py-0"></img>
                                    <div className="InstructorsDetail absolute d-flex flex-column justify-end">
                                        <p className="text-white m-0 font-16 font-bold">Pham Quoc Hung</p>
                                        <p className="text-white m-0 py-2 font-bold font-14">English Instructors</p>

                                        <div className="InstructorSocial d-flex items-center gap-x-2 text-white">
                                            <a href="#" target="_blank" className="text-white font-20"><FaFacebook /></a>
                                            <a href="#" target="_blank" className="text-white font-20"><FaInstagram /></a>
                                            <a href="#" target="_blank" className="text-white font-20"><FaTwitter /></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="Instructors rounded-lg overflow-hidden relative col-3 px-0 py-0">
                                    <img src="https://wp.rrdevs.net/edcare/wp-content/uploads/2024/12/team-2.png" className="rounded-lg col-12 px-0 py-0"></img>
                                    <div className="InstructorsDetail absolute d-flex flex-column justify-end">
                                        <p className="text-white m-0 font-16 font-bold">Pham Quoc Hung</p>
                                        <p className="text-white m-0 py-2 font-bold font-14">English Instructors</p>

                                        <div className="InstructorSocial d-flex items-center gap-x-2 text-white">
                                            <a href="#" target="_blank" className="text-white font-20"><FaFacebook /></a>
                                            <a href="#" target="_blank" className="text-white font-20"><FaInstagram /></a>
                                            <a href="#" target="_blank" className="text-white font-20"><FaTwitter /></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="Instructors rounded-lg overflow-hidden relative col-3 px-0 py-0">
                                    <img src="https://wp.rrdevs.net/edcare/wp-content/uploads/2024/12/team-3.png" className="rounded-lg col-12 px-0 py-0"></img>
                                    <div className="InstructorsDetail absolute d-flex flex-column justify-end">
                                        <p className="text-white m-0 font-16 font-bold">Pham Quoc Hung</p>
                                        <p className="text-white m-0 py-2 font-bold font-14">English Instructors</p>

                                        <div className="InstructorSocial d-flex items-center gap-x-2 text-white">
                                            <a href="#" target="_blank" className="text-white font-20"><FaFacebook /></a>
                                            <a href="#" target="_blank" className="text-white font-20"><FaInstagram /></a>
                                            <a href="#" target="_blank" className="text-white font-20"><FaTwitter /></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="Instructors rounded-lg overflow-hidden relative col-3 px-0 py-0">
                                    <img src="https://wp.rrdevs.net/edcare/wp-content/uploads/2024/12/team-4.png" className="rounded-lg col-12 px-0 py-0"></img>
                                    <div className="InstructorsDetail absolute d-flex flex-column justify-end">
                                        <p className="text-white m-0 font-16 font-bold">Pham Quoc Hung</p>
                                        <p className="text-white m-0 py-2 font-bold font-14">English Instructors</p>

                                        <div className="InstructorSocial d-flex items-center gap-x-2 text-white">
                                            <a href="#" target="_blank" className="text-white font-20"><FaFacebook /></a>
                                            <a href="#" target="_blank" className="text-white font-20"><FaInstagram /></a>
                                            <a href="#" target="_blank" className="text-white font-20"><FaTwitter /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="CourseMain">
                        <div className="d-flex items-center justify-between py-6">
                            <p className="m-0 font-20 font-bold">Most popular couses</p>

                            <nav class="d-flex items-center gap-x-2">
                                <button className="CourseButton active">All</button>
                                <button className="CourseButton">EngLish</button>
                                <button className="CourseButton">Chinese</button>
                                <button className="CourseButton">France</button>
                            </nav>
                        </div>

                        <div className="HotInstructor d-flex items-center justify-between gap-x-3">
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
                        </div>

                        <HotCourse />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Course;