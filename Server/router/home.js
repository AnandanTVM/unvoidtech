// home route
const express = require("express");
const homeControllers = require("../controller/homeController");
const { registerValidation } = require("../middleware/validation");
const router = express.Router();
// to add user details
router.post(
  "/clientRegister",
  registerValidation,
  homeControllers.AddUserContro
);
module.exports = router;
