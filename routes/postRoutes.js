import { Router } from "express";
import { getPosts } from "../controllers/postController.js";

const postRouter = Router();

postRouter.get("/posts", getPosts);

export default postRouter;
