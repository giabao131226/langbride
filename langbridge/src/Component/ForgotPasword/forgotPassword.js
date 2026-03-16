import { useCallback, useEffect } from "react";
import { notification } from 'antd'
import { MdError } from "react-icons/md";
import { MdDone } from "react-icons/md";

import "./forgotPassword.css"


function ForgotPassword() {
    const [api, contextHolder] = notification.useNotification();

    function changePassWord(e) {
        e.preventDefault()

        const inputEmail = e.target.querySelector("input[name='email']")
        const inputNewPassword = e.target.querySelector("input[name='newPassword']")
        const inputConfirmPassword = e.target.querySelector("input[name='confirmPassword']")

        // Kiểm tra xem có giống password k
        if (inputNewPassword.value != inputConfirmPassword.value) {
            inputConfirmPassword.classList.add("alert-error")
            return;
        }
        // 

        const data = {
            email: inputEmail.value,
            newPassword: inputNewPassword.value
        }

        fetch("http://localhost:5000/profile/forgot-password", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    notification.open({
                        "title": "Success!!",
                        description: "You have successfully updated your password",
                        icon: <MdDone />
                    })

                    e.target.reset();
                } else {
                    notification.open({
                        "title": "Error!!",
                        description: "There's an error on the server. Please update it later",
                        icon: <MdError />
                    })
                }
            })

    }

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        const inputMaXacNhan = e.target.querySelector("input[name='maXacNhan']")
        const maXacNhan = document.querySelector("#maXacNhan")?.textContent
        const form = e.target

        if (inputMaXacNhan.value != maXacNhan) {
            inputMaXacNhan.classList.add("alert-error");
            api.open({
                title: "Error!!",
                description: "Verification code does not match!!",
                icon: <MdError />
            })
            return;
        }
        const inputEmail = e.target.querySelector("input[name='email']")
        form.classList.add("d-none")
        const form2 = document.querySelector("#formChangePassword")
        form2.classList.remove("d-none")
        form2.querySelector("input[name='email']").value = inputEmail.value;

    }, [])

    useEffect(() => {
        let char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

        let maXacNhan = ``

        for (let i = 0; i < 4; i++) {
            maXacNhan += char[Math.round(Math.random() * char.length)]
        }
        const element = document.querySelector("#maXacNhan")
        element.textContent = maXacNhan;
    })

    return (
        <>
            {contextHolder}
            <div className="formChangePassword container-fluid text-align-start">
                <div className="container h-screen d-flex items-center justify-center">
                    
                    <form className=" d-flex flex-column items-start justify-center bg-white gap-y-2 relative" onSubmit={handleSubmit}>
                        <div className="d-flex flex-column">
                            <label className="font-bold text-gray-600">Email</label>
                            <input type="email" name="email" required ></input>
                        </div>

                        <div className="d-flex items-center justify-between">
                            <div className="d-flex flex-column">
                                <label className="font-bold text-gray-600">Mã Xác Nhận</label>
                                <input type="text" name="maXacNhan"></input>
                            </div>
                            <p id='maXacNhan' className="px-2 m-0"></p>
                        </div>
                        <button type="submit">Gửi Mã Xác Nhận</button>
                    </form>

                    <form className="d-flex flex-column items-start justify-center bg-white d-none" id='formChangePassword' onSubmit={changePassWord} method="POST">
                        <label>Email</label>
                        <input type='email' name="email"></input>

                        <label>Enter New Password</label>
                        <input type="password" name="newPassword"></input>

                        <label>Confirm New Password</label>
                        <input type="password" name="confirmPassword"></input>

                        <button type="submit">Đổi Mật Khẩu</button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default ForgotPassword;