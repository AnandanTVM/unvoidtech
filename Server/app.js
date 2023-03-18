const express = require("express");
const cors = require("cors");
const db = require("./config/connection");
const app = express();
// dotenv.config();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const homeRouter = require("./routes/home");
app.use("/", homeRouter);

// // data connection call
db.connect((err) => {
  if (err) console.log(`Connection error${err}`);
  else console.log("Datebase Connected to port 27017");
});
app.listen(process.env.PORT, () => {
  console.log(`sever started running on localhost:${process.env.PORT}`);
});
