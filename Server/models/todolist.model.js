const mongoose = require('mongoose')

const toDoListSchema = mongoose.Schema({
    ownerID: String,
    status: Boolean,
    conTent: String,
    dateStart: String,
    dateEnd: String
})

const ToDoList = mongoose.model('ToDoList',toDoListSchema,'todoList')
module.exports = ToDoList;