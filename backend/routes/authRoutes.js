const express = require("express");
const { verifyToken } = require("../middleware/auth");

const authControler = require("../controllers/auth");

const router = express.Router();

router.post("/login", verifyToken, authControler.login);

router.post("/auth", verifyToken, authControler.authenticateToken);

module.exports = router;
