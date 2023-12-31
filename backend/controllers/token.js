const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res) => {
  const token = req.body.token;

  try {
    if (!token) {
      return res.sendStatus(401); // No token provided
    }

    const decodedToken = jwt.verify(
      token,
      process.env.ACSSES_TOKEN_SECRET
    );

    res.status(200).json({
      expiry: decodedToken.exp,
    });
  } catch (error) {
    return res.sendStatus(401); // Invalid token
  }
};
