import { Post } from "../models/Post.js";
import { User } from "../models/User.js";

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

export async function likePost(req, res) {
  const { postId, userId } = req.body;
  const post = await Post.findByIdAndUpdate(
    postId,
    {
      $inc: { likes: 1 },
    },
    { new: true }
  ).populate({
    path: "creator",
    select: "username imgUrl fullname",
  });
  await User.findByIdAndUpdate(userId, {
    $push: { likedPosts: postId },
  });
  res.json(post);
}

export async function unLikePost(req, res) {
  const { postId, userId } = req.body;
  const post = await Post.findByIdAndUpdate(
    postId,
    {
      $inc: { likes: -1 },
    },
    { new: true }
  ).populate({
    path: "creator",
    select: "username imgUrl fullname",
  });
  await User.findByIdAndUpdate(userId, {
    $pull: { likedPosts: postId },
  });
  res.json(post);
}

export async function savePost(req, res) {
  const { postId, userId } = req.body;
  const post = await Post.findByIdAndUpdate(
    postId,
    {
      $inc: { saves: 1 },
    },
    { new: true }
  ).populate({
    path: "creator",
    select: "username imgUrl fullname",
  });
  await User.findByIdAndUpdate(userId, {
    $push: { savedPosts: postId },
  });
  res.json(post);
}

export async function unSavePost(req, res) {
  const { postId, userId } = req.body;
  const post = await Post.findByIdAndUpdate(
    postId,
    {
      $inc: { saves: -1 },
    },
    { new: true }
  ).populate({
    path: "creator",
    select: "username imgUrl fullname",
  });
  await User.findByIdAndUpdate(userId, {
    $pull: { savedPosts: postId },
  });
  res.json(post);
}
