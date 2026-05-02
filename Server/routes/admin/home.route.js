const express = require("express");
const router = express.Router();

const accountController = require("../../controller/admin/account.controller");

router.post("/sign-in", accountController.signIn); // 👈 endpoint

module.exports = router;