
import PageDefault from "../Component/PageDefault/pagedefault";
import Home from "../Component/Home/home";
import Quiz from "../Component/Quiz/quiz";
import Course from "../Component/Course/course";
import EditProfile from "../Component/EditProfile/editprofile";
import ForgotPassword from "../Component/ForgotPasword/forgotPassword";
import ViewToDoList from "../Component/ViewToDoList/viewToDoList";
import Test from "../Component/LamBaiThi/test";
import Result from "../Component/Result/result";
import LayoutDefaultAdmin from "../Component/admin/Home/home.admin";
import QuanLyTaiKhoan from "../Component/admin/QuanLyTaiKhoan/quanlytaikhoan";
import LayoutProtected from "../Component/admin/LayoutProtected/layoutprotected";
import SignInAdmin from "../Component/admin/signIn/sign-in";
import QuizDashBoard from "../Component/QuizDashBoard/quizDashBoard";
import QuanLyBaiDang from "../Component/admin/QuanLyBaiDang/quan-ly-bai-dang";
import KiemDuyet from "../Component/admin/QuanLyBaiDang/KiemDuyet/kiem-duyet";
import CreateBaiTest from "../Component/admin/BaiKiemTra/create/create-bai-test";
import QuanLyBaiKiemTr from "../Component/admin/BaiKiemTra/QuanTri/quan-ly-bai-kiem-tra";
import QuanLyBaiKiemTra from "../Component/admin/BaiKiemTra/QuanTri/quan-ly-bai-kiem-tra";
import XemChiTiet from "../Component/admin/QuanLyTaiKhoan/XemChiTiet/xem-chi-tiet";
import MyPost from "../Component/Home/MyPost/myPost";

const routes = [
    {
        path: "/",
        element: <PageDefault />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/course",
                element: <Course />
            },
            {
                path: "/edit-profile",
                element: <EditProfile />
            },
            {
                path: "/forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "/to-do-list",
                element: <ViewToDoList />
            },
            {
                path: "/my-posts",
                element: <MyPost />
            },
            {
                path: "/lam-bai-thi",
                element: <Test />
            },
            {
                path: "/quiz",
                element: <QuizDashBoard />,
                children: [
                    {
                        path: "result",
                        element: <Result />,
                    }
                ]
            },
        ]
    },
    {
        path: "/admin",
        element: <LayoutDefaultAdmin />,
        children: [
            {
                path: "quan-ly-tai-khoan",
                children: [
                    {
                        path: "",
                        element: <QuanLyTaiKhoan />,
                    },
                    {
                        path: "account/:id",
                        element: <XemChiTiet />
                    }
                ]
            },
            {
                path: "quan-ly-bai-dang",
                element: <QuanLyBaiDang />,
                children: [
                    {
                        "path": "kiem-duyet",
                        element: <KiemDuyet />
                    },

                ]
            },
            {
                "path": "quan-ly-bai-kiem-tra",
                children: [
                    {
                        path: "",
                        "element": <QuanLyBaiKiemTra />,
                    },
                    {
                        path: "create",
                        element: <CreateBaiTest />
                    }
                ]
            }
        ]
    },
    {
        path: "/admin/sign-in",
        element: <SignInAdmin />
    }
]
export default routes;