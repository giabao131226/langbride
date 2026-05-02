const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/manageAccount.controller");

router.get("/",controller.getAccounts);
router.patch("/change-status/:id/:status",controller.changeStatus);

module.exports = router;