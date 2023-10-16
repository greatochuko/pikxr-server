import { Router } from "express";
import { getComments, postComment } from "../controllers/commentControllers.js";

const commentRouter = Router();

commentRouter.get("/comments/:postId", getComments);

commentRouter.post("/comments", postComment);

export default commentRouter;
