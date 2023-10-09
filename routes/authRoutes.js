import { Router } from "express";
import { login, signup } from "../controllers/authController.js";
import { User } from "../models/User.js";

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);

export default authRouter;
