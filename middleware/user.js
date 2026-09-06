const { User } = require("../db");

function UserMiddleware(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;

  User.findOne({
    username,
    password,
  }).then(function (value) {
    if (value) {
      next();
    } else {
      res.status(403).send({
        message: "User doesn't exists",
      });
    }
  });
}

module.exports = UserMiddleware