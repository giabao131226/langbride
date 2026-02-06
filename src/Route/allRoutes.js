
import PageDefault from "../Component/PageDefault/pagedefault";
import Home from "../Component/Home/home";

const routes = [
    {
        path: "/",
        element: <PageDefault/>,
        children: [
            {
                path: "/",
                element: <Home />
            }
        ]
    }
]
export default routes;