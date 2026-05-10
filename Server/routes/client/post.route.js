const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/post.controller");
const storageMulter = require("../../helper/storageMulter.helper");
const multer = require("multer");
const upload = multer({storage: storageMulter()});

router.get("/",controller.getPost);
router.post("/create",upload.array('images'),controller.create);

module.exports = router;