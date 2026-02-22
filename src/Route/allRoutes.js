
import PageDefault from "../Component/PageDefault/pagedefault";
import Home from "../Component/Home/home";
import Quiz from "../Component/Quiz/quiz";

const routes = [
    {
        path: "/",
        element: <PageDefault/>,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                        path: "/quiz",
                        element: <Quiz />,
                    }
        ]
    }
]
export default routes;