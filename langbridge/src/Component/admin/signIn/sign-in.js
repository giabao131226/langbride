import FormSignIn from "../../FormSignIn/formSignIn";
import { useCallback, useContext, useState ,useEffect} from "react";
// May cai Component Ben Ngoai
import { Link } from "react-router-dom"
import { Modal, message } from 'antd'
// CSS
// Icon
import { IoPerson } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
// Image
import smileGirl from '../../../assets/img/ImgSignIn.png'

import "./sign-in.css"
import { AuthContext } from "../../../App";

export default function SignInAdmin() {
    const {user,login} = useContext(AuthContext);

    const [data,setData] = useState({});

    const handleSignIn = useCallback((e) => {
        e.preventDefault();
            
        fetch(`http://localhost:5000/admin1/sign-in`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    message.open({
                        type: "success",
                        content: "Congratulations!! You have successfully logged in."
                    })
                    login(data.token);
                } else {
                   
                    if (data.possition) {
                        const position = data.possition;
                        const inputError = document.querySelector(`input[name=${position}]`)
                        const dadInputError = inputError.closest(".divInputSignIn")
                        dadInputError.classList.add("error")
                        const elementAlertError = document.querySelector("#" + `${inputError.getAttribute("alert-error")}`)
                        elementAlertError.textContent = data.message;
                    }

                    message.open({
                        type: "error",
                        content: "Your username or password is incorrect. Please re-enter it."
                    })
                }
            })
            .catch(err => console.error("LỖI:", err));
    })

    const handleChange = useCallback((e) => {
        const {name,value} = e.target;

        setData({...data,[name]:value});
    })

    // Hàm Xoá Hiển Thị Lỗi
    const deleteAlertError = useCallback((e) => {
        const id = e.target.getAttribute("alert-error")
        const element = document.querySelector("#" + `${id}`)
        const dadElement = e.target.closest(".divInputSignIn")
        dadElement.classList.remove("error")
        element.textContent = '';
    }, [])
    // 

    useEffect(() => {
        console.log("App đã load xong")
        const tokenAdmin = localStorage.getItem("tokenAdmin");
        if(tokenAdmin){
            login(tokenAdmin);
        }
    },[])

    return (
        <>
            <div className="signInAdmin container-fluid text-align-start d-flex items-center justify-center">
                <div className="container d-flex items-center justify-center">
                    <div className="d-flex flex-column bg-white">
                        <div className="signInFormVienIMG">
                            <img src={smileGirl}></img>

                        </div>
                        <h1 className="m-0 text-align-center text-purple">WelCome</h1>
                        <form className="d-flex flex-column gap-y-2 bg-white" id="sign-in-form" onSubmit={handleSignIn}>
                            <div className="d-flex flex-column relative divInputSignIn">
                                <label className="font-bold text-gray-200">UserName</label>
                                <input type="text" minLength={6} maxLength={20} placeholder="Please enter your username..." className="signIninput py-2 px-6 font-bold" name="userName" required onChange={handleChange} alert-error='error-name' onKeyUp={deleteAlertError}></input>
                                <IoPerson className="iconSignIn" />
                            </div>
                            <p className="text-error" id="error-name"></p>

                            <div className="d-flex flex-column relative divInputSignIn">
                                <label className="font-bold text-gray-200">PassWord</label>
                                <input type="password" minLength={8} placeholder="Please enter your password..." className="signIninput py-2 px-6 font-bold" name="passWord" required onChange={handleChange} alert-error='error-password' onKeyUp={deleteAlertError}></input>
                                <FaLock className="iconSignIn" />
                            </div>
                            <p className="text-error" id='error-password'></p>

                            <Link to={"/forgot-password"}><p className="m-0 font-14 font-bold">Forgot Password?</p></Link>
                            <button type="submit" className="signInButton bg-orange text-white border-none font-bold py-2 rounded cursor-pointer">Sign In</button>

                            <div className="d-flex justify-between items-center">
                                <p className="m-0 font-bold">No Account? Create Here</p>
                                <p className="m-0 font-bold"> Terms and Conditions</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}