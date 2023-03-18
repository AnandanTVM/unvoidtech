const homeUtil = require("../util/homeUtil");

const AddUserContro = (req, res) => {
  console.log(req.body);
  homeUtil
    .UserRegister(req.body)
    .then(() => res.json({ status: true, Message: "Upload Success" }))
    .catch((err) => {
      res.status(409).json({ status: false, Message: err.message });
    });
};
module.exports = {
  AddUserContro,
};
