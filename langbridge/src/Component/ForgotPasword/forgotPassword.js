import { useCallback, useEffect } from "react";
import { notification } from 'antd'
import { MdError } from "react-icons/md";
import { MdDone } from "react-icons/md";

import Swal from 'sweetalert2'

import "./forgotPassword.css"


function ForgotPassword() {
    const [api, contextHolder] = notification.useNotification();

    // Hàm gửi mã xác nhận
    const handleSendCode = useCallback((e) => {
        const inputEmail = document.querySelector("form input[name='email']")

        if (!inputEmail.value) return;

        fetch("http://localhost:5000/profile/send-code", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ email: inputEmail.value })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    localStorage.setItem("otp", data.otp)
                }
            })
    })
    // 

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        const inputEmail = document.querySelector("form input[name='email']")

        if (!inputEmail.value) return;

        const inputPassword = document.querySelector("form input[name='newPassWord']")
        const inputConfirmPassword = document.querySelector("form input[name='confirmNewPassWord']")

        if (inputPassword.value != inputConfirmPassword.value) {
            notification.open({
                title: "Error",
                description: "The confirmation password must match the password!!",
                icon: <MdError />
            })
            return;
        }

        fetch("http://localhost:5000/profile/forgot-password", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                newPassword: inputPassword.value,
                email: inputEmail.value
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    Swal.fire({
                        title: "Congratulations🎉🎉",
                        text: "You have successfully changed your password!",
                        icon: "success"
                    });
                    window.location.reload();
                }
            })
    })

    // Xử lý logic khi click nút tiếp tục
    const handleClickContinue = useCallback((e) => {
        e.target.classList.add("d-none")

        const inputOtp = document.querySelector("form input[name='maXacNhan']")

        const otp = localStorage.getItem("otp")
        console.log(otp, inputOtp.value)
        if (inputOtp.value != otp) {
            notification.open({
                title: "Error",
                description: "Mã Otp bạn nhập không đúng",
                icon: <MdError />
            })
            inputOtp.classList.add("error")
            return;
        }
        const inputNewPassword = document.querySelector("form #mxn-password")
        inputNewPassword.classList.remove("d-none")

        const inputConfirmNewPassword = document.querySelector("form #mxn-confirm-password")
        inputConfirmNewPassword.classList.remove("d-none")

        const inputEmail = document.querySelector("form div[div-input-email]")
        inputEmail.classList.add("d-none")

        const inputMXN = document.querySelector("form div[div-input-mxn]")
        inputMXN.classList.add("d-none")
    })
    // 

    return (
        <>
            {contextHolder}
            <div className="forgotPassword container-fluid text-align-start d-flex justify-center items-center h-screen relative">
                <div className="container d-flex justify-center items-center">
                    <div className="forgotPassword__main bg-white d-flex flex-column">
                        <h2 className="m-0 text-align-center py-3">Reset Password</h2>
                        <p className="m-0 text-align-center font-14 font-bold text-gray-600">Please enter your email address to receive the verification code.</p>

                        <div className="py-2"></div>

                        <form className="d-flex flex-column gap-y-4" onSubmit={handleSubmit}>
                            <div className="d-flex flex-column items-start col-12 px-0 py-0 divInputMXN relative" div-input-email="true">
                                <label className="font-bold text-gray-600">Email</label>
                                <input type="email" name="email" placeholder="abc@gmail.com" className="col-12 px-2 py-1"></input>
                            </div>

                            <div className="d-flex flex-column items-start col-12 px-0 py-0 divInputMXN relative" div-input-mxn="true">
                                <div className="d-flex items-center justify-between col-12 px-0 py-0">
                                    <label className="font-bold text-gray-600">Mã Xác Nhận (OTP)</label>
                                    <button className="font-bold bg-transparent border-none cursor-pointer text-blue-400 font-bold" onClick={handleSendCode} type="button">Gửi Mã</button>
                                </div>
                                <input type="text" name="maXacNhan" className="col-12 px-2 py-1"></input>
                            </div>

                            <div className="d-flex flex-column relative divInputMXN d-none" id="mxn-password">
                                <label className="font-bold text-gray-200">New PassWord</label>
                                <input type="password" minLength={8} placeholder="Please enter your password..." className="signIninput py-2 px-2 font-bold" name="newPassWord" required ></input>
                            </div>

                            <div className="d-flex flex-column relative divInputMXN d-none" id="mxn-confirm-password">
                                <label className="font-bold text-gray-200">Confirm New Password</label>
                                <input type="password" minLength={8} placeholder="Please enter confirm password..." className="signIninput py-2 px-2 font-bold" name="confirmNewPassWord" required ></input>
                            </div>

                            <button type="button" className="bg-blue text-white border-none py-2 rounded cursor-pointer" onClick={handleClickContinue} button-continue>Tiếp Tục</button>
                            <button type="submit" className="bg-blue text-white border-none py-2 rounded cursor-pointer" onClick={handleClickContinue}>Xác Nhận</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ForgotPassword;