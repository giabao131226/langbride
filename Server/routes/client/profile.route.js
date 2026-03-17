
const express = require('express');
const router = express.Router();
const multer = require('multer');
const storageMulter = require('../../helper/storageMulter.helper')
const upload = multer({storage: storageMulter()})

const controller = require('../../controller/client/profile.controller');

router.post("/edit-profile",upload.single('avatar'),controller.editProfile)
router.post("/forgot-password",controller.forgotPassword)
router.post("/send-code",controller.sendCode)

module.exports = router;