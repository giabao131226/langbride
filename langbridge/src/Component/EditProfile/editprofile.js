import { useCallback, useContext, useRef, useState } from "react";
import {notification} from "antd"
import { PiHandsClappingFill } from "react-icons/pi";

function EditProfile() {

    const [api, contextHolder] = notification.useNotification();
    const [account, setAccount] = useState(JSON.parse(localStorage.getItem("user")))
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
                    localStorage.setItem("user",JSON.stringify(data.account))
                    window.location.reload();
                }
            })

    })
    return (
        <>  
            {contextHolder}
            <form ref={formRef} id="formEditData" className="d-flex flex-column gap-y-2" encType="multipart/form-data" onSubmit={handleSubmit} >
                <label>Ảnh đại diện</label>
                <input type="file" name="avatar" accept="image/*"></input>

                <label>UserID</label>
                <input type="text" name="_id" value={account._id} readOnly></input>

                <label>UserName</label>
                <input type="text" name="userName" ></input>

                <label>Email</label>
                <input type="email" name="email" ></input>

                <label>Phone</label>
                <input type="text" name="phone" ></input>

                <button type="submit">Cập Nhật</button>
            </form>
        </>
    )
}
export default EditProfile;