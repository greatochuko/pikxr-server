import { Comment } from "../models/Comment.js";
import { Post } from "../models/Post.js";

export async function postComment(req, res) {
  const { comment, user, postId } = req.body;
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    { $push: { comments: { comment, user } } },
    { new: true }
  ).populate({
    path: "comments",
    populate: { path: "user", select: "username imageUrl fullname" },
  });
  res.json(updatedPost);
}
