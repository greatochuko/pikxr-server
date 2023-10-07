import express from "express";
import mongoose from "mongoose";
import router from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(router);

mongoose.connect("mongodb://127.0.0.1:27017/pikxrDB").then(
  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  })
);
