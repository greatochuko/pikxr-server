import { Post } from "../models/Post.js";

export async function getPosts(req, res) {
  const posts = await Post.find()
    .populate({
      path: "creator",
      select: "username imgUrl fullname",
    })
    .sort({ createdAt: -1 });
  res.json(posts);
}

export async function createPost(req, res) {
  const newPost = await Post.create({
    caption: req.body.caption,
    creator: req.body.creator,
    imageUrl: req.file.filename,
  });

  res.json(newPost);
}
