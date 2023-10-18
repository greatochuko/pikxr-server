import { Comment } from "../models/Comment.js";

export async function getComments(req, res) {
  const comments = await Comment.find({ postId: req.params.postId }).populate({
    path: "user",
    select: "username fullname imgUrl",
  });
  res.json(comments);
}

export async function postComment(req, res) {
  const { comment, user, postId } = req.body;
  await Comment.create({ comment, user, postId });
  const comments = await Comment.find({ postId }).populate({
    path: "user",
    select: "username imgUrl fullname",
  });
  res.json(comments);
}
