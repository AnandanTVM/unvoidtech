const userUtil = require("../util/userUtil");
const jwt = require("jsonwebtoken");
// user login controller
const userLoginContro = (req, res) =>
  userUtil
    .loginUser(req.body)
    .then((response) => {
      const token = jwt.sign(
        {
          userId: response.userId,
          name: response.username,
          email: response.email,
        },
        process.env.JWTKEY
      );
      res.json({ status: true, user: token });
    })
    .catch((err) => {
      res.status(err.status).json({ status: false, Message: err.message });
    });

module.exports = {
  userLoginContro,
};
