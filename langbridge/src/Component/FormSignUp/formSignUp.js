import { useCallback, useEffect, useState } from "react";
// May cai Component Ben Ngoai
import { Modal, message } from 'antd'
// CSS
import "./formSignUp.css"
// Icon
import { IoPerson } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
// Image
import smileGirl from '../../assets/img/ImgSignIn.png'


function FormSignUp({ statusModalSignUp, setStatusModalSignUp }) {
    const [accountSignUp, setAccountSignUp] = useState({})

    const closeModalSignUp = useCallback(() => {
        setStatusModalSignUp(false)
    })

    const handleChange = useCallback((e) => {
        accountSignUp[e.target.name] = e.target.value;
    })

    const handleSignUp = useCallback((e) => {
        e.preventDefault();

        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

        let token = "";

        for (let i = 0; i < 25; i++) {
            const index = Math.floor(Math.random() * ((chars.length)))
            token += chars[index]
        }

        accountSignUp["token"] = token;

        fetch("http://localhost:5000/sign-up", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(accountSignUp)
        })
            .then(async res => {
                const data = await res.json();
                return data;
            })
            .then(data => {
                if (data.user) {
                    const formSignUp = document.querySelector("#sign-up-form")
                    formSignUp.reset();
                    setStatusModalSignUp(false);
                    message.open({
                        "type": "success",
                        "content": "“Congratulations, you have successfully signed up!”"
                    })
                    setAccountSignUp({})
                } else {
                    const position = data.possition;
                    const inputError = document.querySelector(`input[name=${position}]`)
                    console.log(inputError)
                    const dadInputError = inputError.closest(".divInputSignUp")
                    dadInputError.classList.add("error")
                    const elementAlertError = document.querySelector("#"+`${inputError.getAttribute("alert-error")}`)
                    elementAlertError.textContent = data.message;

                    message.open({
                        "type": "error",
                        "content": data.message
                    })
                }
            })

    }, [accountSignUp])

    const deleteAlertError = useCallback((e) => {
        const id = e.target.getAttribute("alert-error")
        const element = document.querySelector("#" + `${id}`)
        const dadElement = e.target.closest(".divInputSignUp")
        dadElement.classList.remove("error")
        element.textContent = '';
    },[])


    return (
        <>
            <Modal open={statusModalSignUp} onCancel={closeModalSignUp} footer={false} className="modalSignUp" style={{ top: "5%" }}>
                <div className="signInFormVienIMG">
                    <img src={smileGirl}></img>
                </div>
                <h1 className="m-0 text-align-center text-purple">WelCome</h1>
                <form className="d-flex flex-column gap-y-2" method="POST" id="sign-up-form" onSubmit={handleSignUp}>
                    <div className="d-flex flex-column relative divInputSignIn divInputSignUp">
                        <label className="font-bold text-gray-200">UserName</label>
                        <input type="text" minLength={6} maxLength={20} placeholder="Please enter your username..." className="signIninput py-2 px-6 font-bold" name="userName" required onChange={handleChange} alert-error = 'error-name' onKeyUp={deleteAlertError}></input>
                        <IoPerson className="iconSignIn" />
                    </div>
                    <p className="text-error" id="error-name"></p>

                    <div className="d-flex flex-column relative divInputSignIn divInputSignUp">
                        <label className="font-bold text-gray-200">PassWord</label>
                        <input type="password" minLength={8} placeholder="Please enter your password..." className="signIninput py-2 px-6 font-bold" name="passWord" required onChange={handleChange} alert-error = 'error-password' onKeyUp={deleteAlertError}></input>
                        <FaLock className="iconSignIn" />
                    </div>
                    <p className="text-error" id = 'error-password'></p>

                    <div className="d-flex flex-column relative divInputSignIn divInputSignUp">
                        <label className="font-bold text-gray-200">Confirm Password</label>
                        <input type="password" minLength={8} placeholder="Please enter confirm password..." className="signIninput py-2 px-6 font-bold" name="confirmpassWord" required onChange={handleChange} onKeyUp={deleteAlertError} alert-error = 'error-confirm-password'></input>
                        <FaLock className="iconSignIn" />
                    </div>
                    <p className="text-error" id = 'error-confirm-password'></p>

                    <div className="d-flex flex-column relative divInputSignIn divInputSignUp">
                        <label className="font-bold text-gray-200">Email</label>
                        <input type="email" minLength={8} placeholder="Please enter your email..." className="signIninput py-2 px-6 font-bold" name="email" required onChange={handleChange} alert-error = 'error-email' onKeyUp={deleteAlertError}></input>
                        <MdEmail className="iconSignIn" />
                    </div>
                    <p className="text-error" id="error-email"></p>

                    <div className="d-flex flex-column relative divInputSignIn divInputSignUp">
                        <label className="font-bold text-gray-200">Phone</label>
                        <input type="text" minLength={10} placeholder="Please enter your phone number..." className="signIninput py-2 px-6 font-bold" name="phone" required onChange={handleChange} alert-error = 'error-phone' onKeyUp={deleteAlertError}></input>
                        <FaPhoneAlt className="iconSignIn" />
                    </div>
                    <p className="text-error" id = 'error-phone'></p>

                    <button type="submit" className="signInButton bg-orange text-white border-none font-bold py-2 rounded cursor-pointer">Sign Up</button>

                    <div className="d-flex justify-between items-center">
                        <p className="m-0 font-bold">Got Account? Sign in Here</p>
                        <p className="m-0 font-bold"> Terms and Conditions</p>
                    </div>
                </form>
            </Modal>
        </>
    )
}
export default FormSignUp