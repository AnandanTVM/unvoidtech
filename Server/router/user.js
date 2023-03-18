// user route
const express = require("express");
const userControllers = require("../controller/userController");
const validation = require("../middleware/validation");
const userAuth = require("../middleware/auth");
const router = express.Router();
// login route
router.post(
  "/login",
  validation.loginValidation,
  userControllers.userLoginContro
);
router.post(
  "/uploadBlog",
  userAuth.userProtect,
  validation.blogValidation,
  userControllers.uploadBlog
);
router.get("/getAllBlog", userAuth.userProtect, userControllers.getAllBlog);
router.get("/blogByid/:id", userAuth.userProtect, userControllers.blogById);
router.get(
  "/uploadedBlog",
  userAuth.userProtect,
  userControllers.currentUserBlogs
);
module.exports = router;
