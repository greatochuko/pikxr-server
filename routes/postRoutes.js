import { Router } from "express";
import {
  createPost,
  getPosts,
  likePost,
  unLikePost,
  savePost,
  unSavePost,
} from "../controllers/postController.js";
import multer from "multer";
import { authenticate } from "../middleware/authMiddleware.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.originalname.split(".")[0]}${Date.now()}.${
        file.originalname.split(".")[1]
      }`
    );
  },
});

function fileFilter(req, file, cb) {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

let upload = multer({ storage, fileFilter });

const postRouter = Router();

postRouter.get("/posts/", authenticate, getPosts);

postRouter.post("/posts", authenticate, createPost);

postRouter.post("/post/like", authenticate, likePost);

postRouter.post("/post/unlike", authenticate, unLikePost);

postRouter.post("/post/save", authenticate, savePost);

postRouter.post("/post/unsave", authenticate, unSavePost);

export default postRouter;
