import { Router } from "express";
import { postComment } from "../controllers/commentControllers.js";
import { authenticate } from "../middleware/authMiddleware.js";

const commentRouter = Router();

commentRouter.post("/comments", authenticate, postComment);

export default commentRouter;
