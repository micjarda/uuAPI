require("dotenv").config();

const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const { verifyToken } = require("./middleware/auth");
const user = require("./routes/userRoutes");
const auth = require("./routes/authRoutes");
const shopRoutes = require("./routes/shopRoutes");

dotenv.config();

const app = express();

app.use(cors({}));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/user", user);

app.use("/api/auth", auth);

// app.use(verifyToken);

app.use("/api/shop", shopRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log("Connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
