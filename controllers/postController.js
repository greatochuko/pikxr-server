import { Post } from "../models/Post.js";

export async function getPosts(req, res) {
  const posts = await Post.find();
  res.json(posts);
}

export async function createPost(req, res) {
  const post = await Post.create(req.body);
  res.json(post);
}
