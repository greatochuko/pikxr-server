import { Router } from "express";
import { postComment } from "../controllers/commentControllers.js";

const commentRouter = Router();

commentRouter.post("/comments", postComment);

export default commentRouter;
