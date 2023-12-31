const express = require("express");

const authController = require("../controllers/login");
const tokenController = require("../controllers/token");

const router = express.Router();

router.post("/login", authController.login);

router.post("/auth", tokenController.authenticateToken);

module.exports = router;
