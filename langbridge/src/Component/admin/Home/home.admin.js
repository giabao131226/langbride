import { Header } from "antd/es/layout/layout";
import Sider from "../Sider/sider";
import HeaderAdmin from "../Header/header";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import "./layoutDefaultAdmin.css"
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../App";

export default function LayoutDefaultAdmin() {
    const {user,login} = useContext(AuthContext);
    if (user) {
        return (
            <>
                <div className="d-flex">
                    <Sider />
                    <div className="main-content">
                        <HeaderAdmin />
                        <Outlet />
                    </div>
                </div>

            </>
        )
    } else {
        return <Navigate to={"/admin/sign-in"}></Navigate>
    }

}