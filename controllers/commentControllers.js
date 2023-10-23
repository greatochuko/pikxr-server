import { Comment } from "../models/Comment.js";
import { Notification } from "../models/Notification.js";
import { Post } from "../models/Post.js";

export async function postComment(req, res) {
  const { comment, targetUserId, postId } = req.body;
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    { $push: { comments: { comment, user: req.userId } } },
    { new: true }
  )
    .populate({
      path: "comments",
      populate: { path: "user", select: "username imageUrl fullname" },
    })
    .populate({
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
