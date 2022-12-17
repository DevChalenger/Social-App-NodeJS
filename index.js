const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

// Routes
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const postsRoutes = require("./routes/posts");

dotenv.config();

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MongoDB_Url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoutes);
app.use("/api/user", usersRoutes);
app.use("/api/post", postsRoutes);

app.listen(8800, () => {
  console.log(`Backend server running on port ${process.env.PORT}`);
});
