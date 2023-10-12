import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

var whitelist = ["http://localhost:5173"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || undefined) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(authRouter);
app.use(userRouter);
app.use(postRouter);

mongoose.connect("mongodb://127.0.0.1:27017/pikxrDB").then(
  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  })
);
