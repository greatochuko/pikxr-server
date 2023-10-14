import { Router } from "express";
import {
  getUser,
  validateEmail,
  validateUsername,
} from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const userRouter = Router();

userRouter.get("/user", authenticate, getUser);
userRouter.post("/validateUsername", validateUsername);
userRouter.post("/validateEmail", validateEmail);

export default userRouter;
