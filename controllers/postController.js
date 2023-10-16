import { Post } from "../models/Post.js";

export async function getPosts(req, res) {
  const posts = await Post.find();
  res.json(posts);
}

export async function createPost(req, res) {
  const newPost = await Post.create({
    caption: req.body.caption,
    imageUrl: req.file.filename,
  });

  res.json(newPost);
}
