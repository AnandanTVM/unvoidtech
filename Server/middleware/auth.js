const jwt = require("jsonwebtoken");
const userUtil = require("../util/userUtil");
const userProtect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWTKEY);

    userUtil
      .findUserById(decoded.userId)
      .then((data) => {
        if (data != null) {
          req.user = data;

          console.log("wrocking");
          next();
        } else {
          console.log("failed token");
          res.status(401);
          throw new Error("Not authorized, token fail");
        }
      })
      .catch(() => {
        console.log("failed token");
        res.status(401);
        throw new Error("Not authorized, token fail");
      });
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Autherized");
  }
};

module.exports = {
  userProtect,

};
