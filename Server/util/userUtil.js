const collection = require("../config/collection");
const db = require("../config/connection");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
module.exports = {
  // login
  loginUser: (details) =>
    new Promise((resolve, reject) => {
      let response = {};
      // login database call
      db.get()
        .collection(collection.USER_COLLECTION)
        .findOne({ email: details.email })
        .then((user) => {
          if (user != null) {
            bcrypt
              .compare(details.password, user.password)
              .then((status) => {
                if (status) {
                  response.userId = user._id;
                  response.username = user.firstName;
                  response.email = user.email;
                  resolve(response);
                } else {
                  // incorrect password
                  reject({ message: "Password incorrect", status: 401 });
                }
              })
              .catch((err) => reject(err));
          } else {
            // user not found..
            reject({ message: "No user found..", status: 404 });
          }
        })
        .catch((err) => reject(err));
    }),
  // get client detals by id for auth
  findUserById: (Id) =>
    new Promise((resolve, reject) => {
      db.get()
        .collection(collection.USER_COLLECTION)
        .findOne({ _id: ObjectId(Id) })
        .then((user) => {
          resolve(user);
        })
        .catch((err) => reject(err));
    }),
  // upload Blog
  upladBlog: (data) =>
    new Promise((resolve, reject) => {
      db.get()
        .collection(collection.BLOG_COLLECTION)
        .insertOne(data)
        .then(() => resolve())
        .catch((err) => reject(err));
    }),
  //view all blog
  viewAllBlog: () =>
    new Promise(async (resolve, reject) => {
      try {
        let blog = await db
          .get()
          .collection(collection.BLOG_COLLECTION)
          .find({ delete: false })
          .project({ delete: 0 })
          .sort({ _id: -1 })
          .toArray();
        resolve(blog);
      } catch (error) {
        reject(error);
      }
    }),
  // get blog by id
  blogById: (id) =>
    new Promise((resolve, reject) => {
      db.get()
        .collection(collection.BLOG_COLLECTION)
        .findOne({ _id: ObjectId(id) })
        .then((blog) => resolve(blog))
        .catch((err) => reject(err));
    }),

  getUserBlogOnly: (UId) =>
    new Promise(async (resolve, reject) => {
      try {
        let blog = await db
          .get()
          .collection(collection.BLOG_COLLECTION)
          .find({ createrId: UId, delete: false })
          .project({ delete: 0 })
          .sort({ _id: -1 })
          .toArray();
        resolve(blog);
      } catch (error) {
        reject(error);
      }
    }),
};
