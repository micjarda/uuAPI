//const mongoose = require('mongoose')
require("dotenv").config();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  console.log("login");
  console.log(req.body.username, req.body.password);

  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(401).json({
        message: "Login Failed - User not found",
      });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (isPasswordValid) {
      const acssestoken = jwt.sign({ name: username }, process.env.ACSSES_TOKEN_SECRET, {
        expiresIn: "300s",
      });
      res.status(200).json({
        username: username,
        token: acssestoken
      });
    } else {
      res.status(401).json({
        message: "Login Failed - Invalid password",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred",
    });
  }
};

exports.logout = async (req, res) => {
  res.status(200).json({status: "logout is not done yet..."})
}

exports.authenticateToken = (req, res) => {
  const token = req.body.token;
  if (token === null) {
    return res.sendStatus(401);
  }
  res.status(200).json({ 
    expiry: (jwt.decode(token, { complete: true }).payload.exp)
  });
};
