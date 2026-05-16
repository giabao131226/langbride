const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/manageTest.controller")

router.post("/create",controller.CreateTest);
router.get("/",controller.GetTest)
router.patch("/remove",controller.RemoveTest);
router.patch("/change-status/:id/:status",controller.ChangeStatus)

module.exports = router;