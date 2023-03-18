const express = require("express");
const dotenv = require("dotenv");
const app = express();

// data base connection
const db = require("./config/connection");
const homeRouter = require("./router/home");
const userRouter = require("./router/user");

const { errorHandler, notFound } = require("./middleware/errorMiddleware");
// .env config
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// routs
app.use("/api", homeRouter);
app.use("/api/user", userRouter);

app.use(errorHandler);
app.use(notFound);

// data connection call
db.connect((err) => {
  if (err) console.log(`Connection error${err}`);
  else console.log("Datebase Connected to port 27017");
});
//
app.listen(process.env.PORT, () => {
  console.log(`sever started running on localhost:${process.env.PORT}`);
});
