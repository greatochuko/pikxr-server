import { Router } from "express";
import {
  followUser,
  getUser,
  getUserFollowers,
  getUserProfile,
  searchUsers,
  unFollowUser,
  uploadCoverPhoto,
  validateEmail,
  validateUsername,
} from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const userRouter = Router();

userRouter.get("/user", authenticate, getUser);
userRouter.get("/user/:username", authenticate, getUserProfile);
userRouter.get("/user/followers/:username", getUserFollowers);
userRouter.post("/user/follow", authenticate, followUser);
userRouter.post("/user/unfollow", authenticate, unFollowUser);
userRouter.post("/validateUsername", validateUsername);
userRouter.post("/validateEmail", validateEmail);
userRouter.get("/users/search", searchUsers);
userRouter.post("/user/updatecoverphoto", authenticate, uploadCoverPhoto);

export default userRouter;
