
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

const routes = [
    {
        path: "/",
        element: <PageDefault />,
        children: [
            {
                path: "/",
                element: <Home />,
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
            }
        ]
    },
    {
        path: "/quiz",
        element: <Test />,
        children: [
            {
                path: "result",
                element: <Result />,
            }
        ]
    },
    {
        path: "/admin",
        element: <LayoutDefaultAdmin />,
        children: [
            {
                path: "quan-ly-tai-khoan",
                element: <QuanLyTaiKhoan />
            }
        ]
    },
    {
        path: "/admin/sign-in",
        element: <SignInAdmin />
    }
]
export default routes;