const express = require("express");
const cron = require("node-cron");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(function (req, res, next) {
  next(createError(404, "This endpoint does not exist."));
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const { sendEmail } = require("./emailController");

cron.schedule("0 8 * * *", () => {
  console.log("Task is running every day at 8am: " + new Date());
  sendEmail();
});
