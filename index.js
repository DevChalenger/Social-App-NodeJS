const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

// Routes
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

dotenv.config();

mongoose.set("strictQuery", true);

mongoose.connect(process.env.MongoDB_Url, { useNewUrlParser: true }, () => {
  console.log("Connected to MongoDB");
});

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoutes);
app.use("/api/user", usersRoutes);

app.listen(8800, () => {
  console.log("Backend server is running!");
});
