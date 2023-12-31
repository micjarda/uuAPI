//const mongoose = require('mongoose')
require("dotenv").config();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
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
      const acssestoken = jwt.sign(
        { name: username },
        process.env.ACSSES_TOKEN_SECRET,
        {
          expiresIn: "600s", //10 minut
        }
      );
      res.status(200).json({
        username: username,
        token: acssestoken,
      });
    } else {
      res.status(401).json({
        message: "Login Failed - Invalid password",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
    });
  }
};
