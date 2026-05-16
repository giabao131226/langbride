import { useCallback, useContext, useRef, useState } from "react";
import { notification } from "antd"
import { PiHandsClappingFill } from "react-icons/pi";
import { FaPen } from "react-icons/fa6";


import "./editprofile.css"

function EditProfile() {

    const [api, contextHolder] = notification.useNotification();
    const [account, setAccount] = useState(JSON.parse(localStorage.getItem("user")))

    const [formValue, setFormValue] = useState({
        _id: account._id,
        userName: account.userName,
        email: account.email,
        phone: account.phone,
        avatar: account.avatar
    })

    const handleChange = useCallback((e) => {
        const {name,value} = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        })
    })


    const handleChangeImg = useCallback((e) => {
        const userAvatar = document.querySelector(".EditProfile .EditProfileAvatar #user-avatar")
        
        const inputFile = e.target;

        userAvatar.setAttribute("src",URL.createObjectURL(inputFile.files[0]))
    })

    // Tạo một hộp lưu trữ để gán vào form lấy ra ttin form
    const formRef = useRef()

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
       
        const formData = new FormData(formRef.current);
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        fetch("http://localhost:5000/profile/edit-profile", {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const form = document.querySelector("#formEditData")
                    form.reset();
                    api.open({
                        "title": "Congratulation!!!",
                        "description": "Information updated successfully",
                        icon: <PiHandsClappingFill />
                    }
                    )
                    document.cookie = `token=${data.account}`
                    localStorage.setItem("user", JSON.stringify(data.account))
                    window.location.reload();
                }
            })
    })


    return (
        <>
            {contextHolder}
            <div className="EditProfile container-fluid text-align-start">
                <div className="container">
                    <div className="bg-white py-2 px-4 d-flex items-center justify-between rounded-lg">
                        <p className="m-0 font-bold font-20">Edit Profile</p>
                        <div className="vienimg">
                            <img src={`http://localhost:5000${account.avatar}`}></img>
                        </div>
                    </div>

                    <form ref={formRef} className="d-flex flex-column gap-y-3" encType="multipart/form-data" onSubmit={handleSubmit} id = "formEditData">
                        <div className="d-flex items-center justify-center">
                            <div className="EditProfileAvatar d-flex items-center justify-center relative py-3">
                                <div className="vienimg">
                                    <img src={`http://localhost:5000${formValue.avatar}`} id = "user-avatar"></img>
                                </div>
                                <label className="EditProfilePen text-white bg-blue font-11 px-1 py-1 rounded-50 d-flex items-center justify-center cursor-pointer absolute" for="fileImg">
                                    <FaPen />
                                </label>
                                <input type="file" className="absolute" name="avatar" id="fileImg" onChange={handleChangeImg}></input>
                            </div>
                        </div>
                        <label className="font-bold text-gray-600">ID UserName</label>
                        <input type="text" name="_id" value={formValue._id} className="py-3 px-2 border-none font-bold" readOnly onChange={handleChange}></input>
                        <label className="font-bold text-gray-600">Full Name</label>
                        <input type="text" name="userName" value={formValue.userName} className="py-3 px-2 border-none font-bold" onChange={handleChange}></input>
                        <label className="font-bold text-gray-600">Email</label>
                        <input type="email" name="email" value={formValue.email} className="px-2 py-3 border-none font-bold" onChange={handleChange}></input>
                        <label className="font-bold text-gray-600">Phone</label>
                        <input type="text" name="phone" value={formValue.phone} className="px-2 py-3 border-none font-bold" onChange={handleChange}></input>
                        <label className="font-bold text-gray-600">City</label>
                        <select className="py-3 px-2 border-none">
                            <option name="city" value="HaNoi" selected>
                                Hà Nội
                            </option>
                            <option name="city" value="HaiPhong">
                                Hải Phòng
                            </option>
                            <option name="city" value="TPHCM">
                                Thành Phố HCM
                            </option>
                            <option name="city" value="Hue">
                                Huế
                            </option>
                        </select>

                        <div className="col-12 px-0 py-0 d-flex justify-end gap-x-3 py-3">
                            <button className="border-none px-3 py-3 rounded font-bold font-14 cursor-pointer">Back To Home</button>
                            <button className="border-none bg-blue text-white px-3 py-3 rounded font-bold font-14 cursor-pointer" type="submit">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
            
            
        </>
    )
}
export default EditProfile;