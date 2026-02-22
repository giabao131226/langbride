
import { useCallback,useState } from "react";
// May cai Component Ben Ngoai
import { Link } from "react-router-dom"
import { Modal, message } from 'antd'
// CSS
// Icon
import { IoPerson } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
// Image
import smileGirl from '../../assets/img/ImgSignIn.png'

function FormSignIn({ statusModalSignIn, setStatusModalSignIn, setStatusSignIn }) {
    const [accountSignIn, setAccountSignIn] = useState({})

    const closeModalSignIn = useCallback(() => {
        setStatusModalSignIn(false)
    })

    const handleSignIn = useCallback((e) => {
        e.preventDefault();

        console.log(accountSignIn)

        fetch(`http://localhost:5000/sign-in`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(accountSignIn)
        })
            .then(res => res.json())
            .then(data => {
                if (data.user) {
                    message.open({
                        type: "success",
                        content: "Congratulations!! You have successfully logged in."
                    })
                    window.localStorage.setItem("user", JSON.stringify(data.user))
                    document.cookie = `token=${data.user}`
                    const form = document.querySelector("#sign-in-form")
                    form.reset();
                    setStatusModalSignIn(false)
                    setStatusSignIn(true)
                    setAccountSignIn({})
                } else {
                    message.open({
                        type: "error",
                        content: "Your username or password is incorrect. Please re-enter it."
                    })
                }
            })
    })

    const handleChange = useCallback((e) => {
        accountSignIn[e.target.name] = e.target.value;
    })
    return (
        <>
            <Modal open={statusModalSignIn} onCancel={closeModalSignIn} footer={false} className="modalSignIn" style={{ top: "5%" }}>
                <div className="signInFormVienIMG">
                    <img src={smileGirl}></img>
                </div>
                <h1 className="m-0 text-align-center text-purple">WelCome</h1>
                <form className="d-flex flex-column gap-y-2" methods="POST" id="sign-in-form" onSubmit={handleSignIn}>
                    <div className="d-flex flex-column relative divInputSignIn">
                        <label className="font-bold text-gray-200">UserName</label>
                        <input type="text" minLength={8} placeholder="Please enter your username..." className="signIninput py-2 px-6 font-bold" name="userName" required onChange={handleChange}></input>
                        <IoPerson className="iconSignIn" />
                    </div>
                    <div className="d-flex flex-column relative divInputSignIn">
                        <label className="font-bold text-gray-200">PassWord</label>
                        <input type="password" minLength={8} placeholder="Please enter your password..." className="signIninput py-2 px-6 font-bold" name="passWord" required onChange={handleChange}></input>
                        <FaLock className="iconSignIn" />
                    </div>
                    <Link to={"/"}><p className="m-0 font-14 font-bold">Forgot Password?</p></Link>
                    <button type="submit" className="signInButton bg-orange text-white border-none font-bold py-2 rounded cursor-pointer">Sign In</button>

                    <div className="d-flex justify-between items-center">
                        <p className="m-0 font-bold">No Account? Create Here</p>
                        <p className="m-0 font-bold"> Terms and Conditions</p>
                    </div>
                </form>
            </Modal>
        </>
    )
}
export default FormSignIn;