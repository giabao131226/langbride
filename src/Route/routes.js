import routes from "./allRoutes";
import { useRoutes } from "react-router-dom";

function AllRoutes(){
    const route = useRoutes(routes)
    return (
        <>
            {route}
        </>
            
    )
}
export default AllRoutes;