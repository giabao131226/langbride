const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/managePost.controller");

router.get("/",controller.getPost);
router.get("/remove/:id",controller.RemovePost);

module.exports = router;