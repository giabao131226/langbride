import { FaS } from "react-icons/fa6";
import "./headerAdmin.css"

import { FaSearch } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../../App";
import { jwtDecode } from "jwt-decode";


export default function HeaderAdmin(){
    const {user,login} = useContext(AuthContext);
    const account = jwtDecode(user);
    console.log(account)
    return (
        <>
            <header className="header-admin d-flex items-center justify-between bg-black container-fluid text-align-start py-2 px-3">
                <button className="bg-transparent text-white border-none cursor-pointer font-16"><FaSearch /></button>
                <span className="text-white font-bold font-14">Xin Chào {account.userName}!!</span>
            </header>
        </>
    )
}