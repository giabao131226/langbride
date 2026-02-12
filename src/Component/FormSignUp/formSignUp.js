import { useCallback,useEffect,useState } from "react";
// May cai Component Ben Ngoai
import { Modal, message } from 'antd'
// CSS
// Icon
import { IoPerson } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
// Image
import smileGirl from '../../assets/img/ImgSignIn.png'


function FormSignUp({statusModalSignUp,setStatusModalSignUp}){
    const [accountSignUp,setAccountSignUp] = useState({})

    const closeModalSignUp = useCallback(() => {
        setStatusModalSignUp(false)
    })

    const handleChange = useCallback((e) => {
        accountSignUp[e.target.name] = e.target.value;
    },[])

    const handleSignUp = useCallback((e) => {
        e.preventDefault();

        fetch("http://localhost:3000/user",{
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(accountSignUp)
        })
            .then(res => res.json())
            .then(data => {
                const formSignUp = document.querySelector("#sign-up-form")
                formSignUp.reset();

                setStatusModalSignUp(false);
                message.open({
                    "type": "success",
                    "content": "“Congratulations, you have successfully signed up!”"
                })
            })
    },[accountSignUp])

    return (
        <>
            <Modal open={statusModalSignUp} onCancel={closeModalSignUp} footer={false} className="modalSignUp" style={{ top: "5%" }}>
                <div className="signInFormVienIMG">
                    <img src={smileGirl}></img>
                </div>
                <h1 className="m-0 text-align-center text-purple">WelCome</h1>
                <form className="d-flex flex-column gap-y-2" method="POST" id = "sign-up-form" onSubmit={handleSignUp}>
                    <div className="d-flex flex-column relative divInputSignIn">
                        <label className="font-bold text-gray-200">UserName</label>
                        <input type="text" minLength={8} maxLength={20} placeholder="Please enter your username..." className="signIninput py-2 px-6 font-bold" name="userName" required onChange={handleChange}></input>
                        <IoPerson className="iconSignIn" />
                    </div>
                    <div className="d-flex flex-column relative divInputSignIn">
                        <label className="font-bold text-gray-200">PassWord</label>
                        <input type="password" minLength={8} placeholder="Please enter your password..." className="signIninput py-2 px-6 font-bold" name="passWord" required onChange={handleChange}></input>
                        <FaLock className="iconSignIn" />
                    </div>
                    <div className="d-flex flex-column relative divInputSignIn">
                        <label className="font-bold text-gray-200">Email</label>
                        <input type="email" minLength={8} placeholder="Please enter your email..." className="signIninput py-2 px-6 font-bold" name="email" required onChange={handleChange}></input>
                        <MdEmail className="iconSignIn" />
                    </div>
                    <div className="d-flex flex-column relative divInputSignIn">
                        <label className="font-bold text-gray-200">Phone</label>
                        <input type="text" minLength={10} placeholder="Please enter your phone number..." className="signIninput py-2 px-6 font-bold" name="phone" required onChange={handleChange}></input>
                        <FaPhoneAlt className="iconSignIn" />
                    </div>

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