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

postRouter.get("/posts/", getPosts);

postRouter.post("/posts", upload.single("image"), createPost);

postRouter.post("/post/like", likePost);

postRouter.post("/post/unlike", unLikePost);

postRouter.post("/post/save", savePost);

postRouter.post("/post/unsave", unSavePost);

export default postRouter;
