import { Router } from "express";
import {
  deleteComment,
  getComments,
  postComment,
} from "../controllers/commentControllers.js";
import { authenticate } from "../middleware/authMiddleware.js";

const commentRouter = Router();

commentRouter.get("/comments/:postId", authenticate, getComments);
commentRouter.post("/comments", authenticate, postComment);
commentRouter.delete("/comment/:commentId", authenticate, deleteComment);

export default commentRouter;
