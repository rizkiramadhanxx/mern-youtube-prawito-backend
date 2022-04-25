const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const authRoutes = require("./src/routes/auth");
const blogRoutes = require("./src/routes/blog");

// app.use(express.json());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET",
    "PUT",
    "POST",
    "DELETE",
    "OPTIONS",
    "PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use("/v1/auth", authRoutes);
app.use("/v1/blog", blogRoutes);
app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});
mongoose
  .connect(
    "mongodb+srv://rizkiramadhanx:jayamandiri@cluster0.pcu0a.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => app.listen(4000, () => console.log("connect")))
  .catch((err) => console.log(err));
