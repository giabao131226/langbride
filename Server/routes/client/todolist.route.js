
const express = require('express')
const router = express.Router();
const controller = require('../../controller/client/todolist.controller')

router.get("/:ownerID/:status",controller.toDoList)

module.exports = router;