import { Router } from "express";
import { createPost, getPosts } from "../controllers/postController.js";

const postRouter = Router();

postRouter.get("/posts/", getPosts);

postRouter.post("/posts", createPost);

export default postRouter;
