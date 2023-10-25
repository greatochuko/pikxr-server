import { Comment } from "../models/Comment.js";
import { Notification } from "../models/Notification.js";
import { Post } from "../models/Post.js";

export async function getComments(req, res) {
  const comments = await Comment.find({ postId: req.params.postId }).populate({
    path: "user",
    select: "username fullname imageUrl",
  });
  res.json(comments);
}

export async function postComment(req, res) {
  const { comment, targetUserId, postId } = req.body;
  const newComment = await Comment.create({
    comment,
    user: req.userId,
    postId,
  });
  // Add comment ID to list of comments in post
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    { $push: { comments: newComment._id } },
    { new: true }
  ).populate({
    path: "creator",
    select: "username imageUrl fullname",
  });

  // Create notification for action
  await Notification.create({
    targetUser: targetUserId,
    message: "commented on your post",
    user: req.userId,
  });
  res.json(updatedPost);
}

export async function deleteComment(commentId) {
  const comment = await Comment.findByIdAndDelete(commentId);
  await Post.findByIdAndUpdate(comment.postId, {
    $pull: { comments: comment._id },
  });
  res.json(comment);
}
