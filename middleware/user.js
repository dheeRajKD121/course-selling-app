const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require ("../config")

const AdminMiddleware = (req, res, next) => {
  const rawToken = req.headers.authorization;
  const rawTokenArr = rawToken.split(" ");
  const token = rawTokenArr[1];

  const decoded = jwt.verify(token, JWT_SECRET);
  if (decoded.username) {
    req.headers.username= decoded.username
    next();
  } else {
    res.status(403).send({
      message: "User doesn't exists.",
    });
  }
}



module.exports = AdminMiddleware;
