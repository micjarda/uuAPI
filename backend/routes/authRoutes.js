const express = require("express");

const authControler = require("../controllers/auth");

const router = express.Router();

router.post("/login", authControler.login);

router.post("/logout", authControler.logout);

router.post("/auth", authControler.authenticateToken);

module.exports = router;
