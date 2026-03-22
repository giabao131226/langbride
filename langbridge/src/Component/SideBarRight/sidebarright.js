
import { useCallback, useEffect, useState } from "react";
// May cai Component Ben Ngoai
import Profile from "../Profile/profile";

// CSS
import "./sidebarright.css"
// Icon
// Image


function SideBarRight({ statusProfile, setStatusProfile, statusSignIn, reload,setReload }) {

    const closeProfile = useCallback(() => {
        setStatusProfile(false);
    }, [statusProfile])

    useEffect(() => {
        const sbr = document.querySelector(".sideBarRight")
        if (!sbr) return;
        if (!statusProfile) sbr.classList.add("close")
        else sbr.classList.remove("close")
    }, [statusProfile])

    return (
        <>
            {statusSignIn ? (
                <div className={`sideBarRight ${!statusProfile ? "close" : ""}`}>
                    <div className="container bg-white h-screen border-box px-3">
                        <Profile
                            setStatusProfile={setStatusProfile}
                            closeProfile={closeProfile}
                            reload = {reload}
                            setReload = {setReload}
                        />
                    </div>
                </div>
            ) : (
                <></>
            )}

        </>
    )
}
export default SideBarRight;