const collection = require("../config/collection");
const db = require("../config/connection");
const bcrypt = require("bcrypt");
module.exports = {
  UserRegister: (details) =>
    new Promise((resolve, reject) => {
      // find the user exist or not
      db.get()
        .collection(collection.USER_COLLECTION)
        .findOne({
          $or: [{ email: details.email }, { phone: details.phone }],
        })
        .then(async (userData) => {
          if (userData === null) {
            // user not exist add user
            details.password = await bcrypt.hash(details.password, 10);
            db.get()
              .collection(collection.USER_COLLECTION)
              .insertOne(details)
              .then(() => resolve())
              .catch((err) => reject(err));
          } else {
            // User already exist
            reject({ message: "User already exist.." });
          }
        })
        .catch((err) => reject(err));
    }),
};
