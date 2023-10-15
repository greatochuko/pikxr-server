import { Router } from "express";
import { getComments, postComment } from "../controllers/commentControllers";

const commentRouter = Router();

commentRouter.get("/comments/:postId", getComments);

commentRouter.post("/comments", postComment);

export default commentRouter;
