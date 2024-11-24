const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

//dotenv
const dotenv = require("dotenv");
const router = require("./routes/testRoute");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDb = require("./config/db");
dotenv.config();

//DBConnection
connectDb();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", router);
app.use("/api/v1/user", userRoutes);

//Router /
app.get("/", (req, res) => {
  return res.status(200).json("Hello world ");
});

//Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is listening to the port ${PORT}`);
});
