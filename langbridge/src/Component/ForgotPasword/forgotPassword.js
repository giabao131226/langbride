import { useCallback, useEffect } from "react";
import { notification } from 'antd'
import { MdError } from "react-icons/md";
import { MdDone } from "react-icons/md";

import "./forgotPassword.css"


function ForgotPassword() {
    const [api, contextHolder] = notification.useNotification();

    const handleSendCode = useCallback((e) => {
        const inputEmail = document.querySelector("form input[name='email']")

        console.log(inputEmail.value)

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

    const handleClickContinue = useCallback((e) => {
        e.target.classList.add("d-none")

        const inputOtp = document.querySelector("form div[inputOtp]")
        inputOtp.remove()

        const inputNewPassword = document.querySelector("form div[mxn-password]")
        inputNewPassword.classList.remove("d-none")
        const inputConfirmNewPassword = document.querySelector("form div[mxn-confirm-password]")
        inputConfirmNewPassword.classList.remove("d-none")


    })

    return (
        <>
            {contextHolder}
            <div className="forgotPassword container-fluid text-align-start d-flex justify-center items-center h-screen relative">
                <div className="container d-flex justify-center items-center">
                    <div className="forgotPassword__main bg-white d-flex flex-column">
                        <h2 className="m-0 text-align-center py-3">Quên Mật Khẩu</h2>
                        <p className="m-0 text-align-center font-14 font-bold text-gray-600">Vui Lòng Nhập Email Của Bạn Để Nhận Mã Xác Nhận</p>

                        <div className="py-2"></div>

                        <form className="d-flex flex-column gap-y-4">
                            <div className="d-flex flex-column items-start col-12 px-0 py-0 divInputMXN relative">
                                <label className="font-bold text-gray-600">Email</label>
                                <input type="email" name="email" placeholder="abc@gmail.com" className="col-12 px-2 py-1"></input>
                            </div>
                            <div className="d-flex flex-column items-start col-12 px-0 py-0 divInputMXN relative" inputOtp="">
                                <div className="d-flex items-center justify-between col-12 px-0 py-0">
                                    <label className="font-bold text-gray-600">Mã Xác Nhận (OTP)</label>
                                    <button className="font-bold bg-transparent border-none cursor-pointer text-blue-400 font-bold" onClick={handleSendCode} type="button">Gửi Mã</button>
                                </div>
                                <input type="text" name="maXacNhan" className="col-12 px-2 py-1"></input>
                            </div>

                            <div className="d-flex flex-column relative divInputMXN d-none" mxn-password="">
                                <label className="font-bold text-gray-200">PassWord</label>
                                <input type="password" minLength={8} placeholder="Please enter your password..." className="signIninput py-2 px-2 font-bold" name="passWord" required ></input>
                            </div>

                            <div className="d-flex flex-column relative divInputMXN d-none" mxn-confirm-password="">
                                <label className="font-bold text-gray-200">Confirm Password</label>
                                <input type="password" minLength={8} placeholder="Please enter confirm password..." className="signIninput py-2 px-2 font-bold" name="confirmpassWord" required ></input>
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