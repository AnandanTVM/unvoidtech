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

const uploadBlog = (req, res) => {
  let data = req.body;
  let d = new Date();
  date = [
    d.getFullYear(),
    ("0" + (d.getMonth() + 1)).slice(-2),
    ("0" + d.getDate()).slice(-2),
  ].join("-");
  data.date = date;
  data.delete = false;
  data.createrId = req.user._id;
  userUtil
    .upladBlog(data)
    .then(() =>
      res.json({ status: true, Message: "Blog uploaded sucessfully..." })
    )
    .catch((err) => res.json({ status: false, Message: err.message }));
};

const getAllBlog = (req, res) =>
  userUtil
    .viewAllBlog()
    .then((blog) => res.json({ status: true, allBlog: blog }))
    .catch(() => res.json({ status: false, Message: err.message }));

const blogById = (req, res) => {
  let id = req.params.id;
  userUtil
    .blogById(id)
    .then((blog) => res.json({ status: true, blogDetails: blog }))
    .catch((err) => res.json({ status: false, Message: err.message }));
};

const currentUserBlogs = (req, res) =>
  userUtil
    .getUserBlogOnly(req.user._id)
    .then((blog) => res.json({ status: true, blogs: blog }))
    .catch((err) => res.json({ status: false, Message: err.message }));

module.exports = {
  userLoginContro,
  uploadBlog,
  getAllBlog,
  blogById,
  currentUserBlogs,
};
