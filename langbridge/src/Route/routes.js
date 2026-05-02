import { useContext } from "react";
import routes from "./allRoutes";
import { useRoutes } from "react-router-dom";
import { AuthContext } from "../App";

function AllRoutes(){
    const route = useRoutes(routes);
    return (
        <>
            {route}
        </>
            
    )
}
export default AllRoutes;