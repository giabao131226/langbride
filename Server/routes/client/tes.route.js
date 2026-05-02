
const express = require("express")
const router = express.Router();
const controller = require("../../controller/client/test.controller")


router.get("/get-exam/:id",controller.getExam)
router.get("/get-answer/:id",controller.getAnswer)
router.post("/submit",controller.getPoint)

module.exports = router