import { Comment } from "../models/Comment.js";

export async function getComments(req, res) {
  const comments = await Comment.find({ postId: req.params.postId }).populate({
    path: "user",
    select: "username, imgUrl",
  });
  res.json(comments);
}

export async function postComment(req, res) {
  const { postId, comment, userId } = req.body;
  const newComment = await Comment.create({ postId, comment, userId });
  res.json(newComment);
}
