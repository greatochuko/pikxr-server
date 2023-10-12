import { Post } from "../models/Post.js";

export async function getPosts(req, res) {
  const posts = await Post.find();
  res.json(posts);
}
