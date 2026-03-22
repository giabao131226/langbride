
const TodoList = require('../../models/todolist.model')

module.exports.toDoList = async (req, res) => {

    const id = req.params.ownerID
    const status = req.params.status === true

    const toDoList = await TodoList.find({ ownerID: id, status: status })

    res.status(200).json(toDoList)
}
// [PATCH] /change-status/:id
module.exports.changeStatus = async (req, res) => {
    const id = req.params.id;
    console.log("id được update là",id)
    try{
        await TodoList.updateOne({_id: id},{status: true})
        return res.status(200).json({
            success: true,
            message: "Update Complete!!"
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({success: false,message: "Server Error!!"})
    }
}
// [POST] /post/:ownerID/:id
module.exports.addTask = async (req,res) => {
    // const onwerID = req.params.ownerID;
    // const id = req.params.id;

    try{
        const data = await TodoList.create(req.body)
        res.status(201).json({
            success: true,
            message: "Complete Add Task",
            data: data
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Error"
        })
    }
}