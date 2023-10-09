require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const path = require("path");
const cors = require("cors");

//db connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("database connected");
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.resolve(__dirname, "public")));

routes(app);

app.get("/", (req, res) => {
  res.status(200).send({ success: true, message: "running..!" });
});

app.use((req, res, next) => {
  const error = createError(404);
  next(error);
});

app.use((error, req, res, next) => {
  // infologger.error(error.message);
  console.log(error);
  res.statusCode = error.statusCode;
  res.send({
    success: false,
    message: error.message,
  });
});

module.exports = app;
