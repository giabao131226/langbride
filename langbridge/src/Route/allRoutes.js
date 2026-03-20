
import PageDefault from "../Component/PageDefault/pagedefault";
import Home from "../Component/Home/home";
import Quiz from "../Component/Quiz/quiz";
import Course from "../Component/Course/course";
import EditProfile from "../Component/EditProfile/editprofile";
import ForgotPassword from "../Component/ForgotPasword/forgotPassword";
import ViewToDoList from "../Component/ViewToDoList/viewToDoList";

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
                path: "/quiz",
                element: <Quiz />,
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
    }
]
export default routes;