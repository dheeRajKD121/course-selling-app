const { Admin } = require("../db");

const AdminMiddleware = (req, res, next) => {
  const username = req.headers.username;
  const password = req.headers.password;

  Admin.findOne({
    username,
    password,
  }).then((value) => {
    if (value) {
      next();
    } else {
      res.status(403).send({
        message: "User doesn't exists.",
      });
    }
  });
};

module.exports = AdminMiddleware;
