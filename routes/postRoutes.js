import { Router } from "express";
import {
  getPost,
  createPost,
  getPosts,
  likePost,
  unLikePost,
  savePost,
  unSavePost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const postRouter = Router();

postRouter.get("/posts", authenticate, getPosts);

postRouter.get("/posts/:postId", authenticate, getPost);

postRouter.post("/posts", authenticate, createPost);

postRouter.post("/post/like", authenticate, likePost);

postRouter.post("/post/unlike", authenticate, unLikePost);

postRouter.post("/post/save", authenticate, savePost);

postRouter.post("/post/unsave", authenticate, unSavePost);

postRouter.patch("/post/:postId", authenticate, updatePost);

postRouter.delete("/post/:postId", authenticate, deletePost);

export default postRouter;
