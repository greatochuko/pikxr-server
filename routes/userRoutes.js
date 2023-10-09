import { Router } from "express";
import { getUser } from "../controllers/userController.js";
import { User } from "../models/User.js";
import { authenticate } from "../middleware/authMiddleware.js";

const userRouter = Router();

userRouter.get("/user", authenticate, getUser);

export default userRouter;
