const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
// const bcrypt = require('bcrypt');
dotenv.config();

const validateId = (req, res, next) => {
  checkForHexRegExp = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
  const { id } = req.params;
  const isvalid = checkForHexRegExp.test(id);

  if (isvalid) {
    next();
  } else {
    res.status(404).json({ message: "Unvalid id." });
  }
};

module.exports = { validateId };
