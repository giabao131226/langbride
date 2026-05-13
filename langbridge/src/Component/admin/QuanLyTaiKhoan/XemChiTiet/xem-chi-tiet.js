import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export default function XemChiTiet(){
    const [accDetail,setAccDetail] = useState({});
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        fetch(`http://localhost:5000/admin1/quan-ly-tai-khoan/account/${id}`)
            .then(res => res.json())
            .then(data => {
                if(data.success){
                    setAccDetail(data.accDetail);
                }else console.log(data.message);
            })
    },[])
    return (
        <>
            
        </>
    )
}