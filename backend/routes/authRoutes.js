const express = require("express");
const { verifyToken } = require("../middleware/auth");

const authControler = require("../controllers/auth");

const router = express.Router();

router.post("/login", authControler.login);

router.post("/auth", authControler.authenticateToken);

module.exports = router;
