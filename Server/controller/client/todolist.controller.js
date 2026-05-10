
const TodoList = require('../../models/todolist.model')

module.exports.toDoList = async (req, res) => {

    const id = req.params.ownerID;
    const status = req.params.status;
    console.log(status);
    const find = {
        "ownerID": id
    }
    if(status != "all") find.status = status;

    console.log(find);
    const toDoList = await TodoList.find(find);
    console.log(toDoList);
    res.status(200).json(toDoList)
}
// [PATCH] /change-status/:id
module.exports.changeStatus = async (req, res) => {
    const id = req.params.id;
    const status = req.body.status;
    console.log("id được update là", id)
    console.log("status nhận được là " + status);
    try {
        const result = await TodoList.updateOne(
            { _id: id },
            { $set: { status } }
        );
        console.log(result);
        return res.status(200).json({
            success: true,
            message: "Update Complete!!"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Server Error!!" })
    }
}
// [POST] /post/:ownerID/:id
module.exports.addTask = async (req, res) => {

    try {
        const data = await TodoList.create(req.body)
        res.status(201).json({
            success: true,
            message: "Complete Add Task",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error"
        })
    }
}

// [PATCH] /remove/:id
module.exports.remove = async (req,res) => {
    const id = req.params.id;
    console.log(id);

    if(id){
        try{
            await TodoList.deleteOne({_id: id});

            res.json({"success": true,"message": "Xoá thành công item có id là "+ id});
        }catch(error){
            console.log("Bị lỗi trong quá trình xoá sản phẩm: "+error);
            res.json({"success": false,"message": error});
        }
    }
    res.json({"success": false,"message": "Xoá sản phẩm không thành công"});
}