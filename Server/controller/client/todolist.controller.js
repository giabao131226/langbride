
const TodoList = require('../../models/todolist.model')

module.exports.toDoList = async (req,res) => {

    const id = req.params.ownerID
    const status = req.params.status === true

    const toDoList = await TodoList.find({ownerID: id,status: status})

    res.status(200).json(toDoList)
}