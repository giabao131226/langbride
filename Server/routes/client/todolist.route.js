
const express = require('express')
const router = express.Router();
const controller = require('../../controller/client/todolist.controller')

router.get("/:ownerID/:status",controller.toDoList)
router.patch("/change-status/:id",controller.changeStatus)
router.post("/add-task",controller.addTask)

module.exports = router;