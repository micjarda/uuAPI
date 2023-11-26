const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// const bcrypt = require('bcrypt');
dotenv.config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    const decoded = jwt.verify(token, process.env.ACSSES_TOKEN_SECRET);
    req.decoded = decoded;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
};

// const userLogin = async (req, res, next) => {
//   const users = db.users;
//   const user = users.find((item) => item.username === req.body.user);
//   if (user) {
//     const validPassword = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );
//     if (validPassword) {
//       const token = generateAccessToken(user.username, user.email, user.level);
//       req.token = token;
//       const refreshToken = generateRefreshToken(
//         user.username,
//         user.email,
//         user.level
//       );
//       req.refreshToken = refreshToken;
//       req.content = {
//         user: user.username,
//         email: user.email,
//         level: user.level,
//       };

//       addToList(refreshToken, token);
//       return next();
//     } else {
//       res.status(400).json({ error: 'Invalid Password' });
//     }
//   } else {
//     res.status(401).json({ error: 'User not found' });
//   }
// };

module.exports = { verifyToken };