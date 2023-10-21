import { Router } from "express";
import {
  getUser,
  getUserProfile,
  searchUsers,
  validateEmail,
  validateUsername,
} from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const userRouter = Router();

userRouter.get("/user", authenticate, getUser);
userRouter.get("/user/:username", authenticate, getUserProfile);
userRouter.post("/validateUsername", validateUsername);
userRouter.post("/validateEmail", validateEmail);

userRouter.get("/users/search", searchUsers);

export default userRouter;
