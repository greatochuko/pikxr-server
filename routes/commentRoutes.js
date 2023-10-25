import { Router } from "express";
import { getComments, postComment } from "../controllers/commentControllers.js";
import { authenticate } from "../middleware/authMiddleware.js";

const commentRouter = Router();

commentRouter.get("/comments/:postId", authenticate, getComments);
commentRouter.post("/comments", authenticate, postComment);

export default commentRouter;
