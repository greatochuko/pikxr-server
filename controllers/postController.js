import { Notification } from "../models/Notification.js";
import { Post } from "../models/Post.js";
import { User } from "../models/User.js";
import deleteFile from "../utils/deleteFile.js";
import { uploadPhoto } from "../utils/uploadPhoto.js";

export async function getPosts(req, res) {
  try {
    const posts = await Post.find().populate({
      path: "creator",
      select: "username imageUrl fullname",
    });
    res.json(posts);
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function getPost(req, res) {
  try {
    const post = await Post.findById(req.params.postId).populate({
      path: "creator",
      select: "username imageUrl fullname",
    });
    res.json(post);
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function createPost(req, res) {
  const { caption } = req.body;
  if (!req.files) return res.json({ error: "Please select an image" });
  const { image } = req.files;
  const { url } = await uploadPhoto(image);

  try {
    const newPost = await Post.create({
      caption,
      creator: req.userId,
      imageUrl: url,
    });
    newPost.populate({
      path: "creator",
      select: "username imageUrl fullname",
    });
    newPost.populate({
      path: "comments",
      populate: { path: "user", select: "username imageUrl fullname" },
    });

    User.findByIdAndUpdate(req.userId, { $push: { posts: newPost._id } });

    res.json(newPost);
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function likePost(req, res) {
  try {
    const { postId, targetUserId } = req.body;
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: req.userId },
      },
      { new: true }
    )
      .populate({
        path: "creator",
        select: "username imageUrl fullname",
      })
      .populate({
        path: "comments",
        populate: { path: "user", select: "username imageUrl fullname" },
      });

    // Update user list of saved posts
    await User.findByIdAndUpdate(req.userId, {
      $push: { likedPosts: postId },
    });

    // Create notification for action
    await Notification.create({
      targetUser: targetUserId,
      message: "liked your post",
      user: req.userId,
    });
    res.json(post);
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function unLikePost(req, res) {
  try {
    const { postId, targetUserId } = req.body;
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: req.userId },
      },
      { new: true }
    )
      .populate({
        path: "creator",
        select: "username imageUrl fullname",
      })
      .populate({
        path: "comments",
        populate: { path: "user", select: "username imageUrl fullname" },
      });

    // Update user list of saved posts
    await User.findByIdAndUpdate(req.userId, {
      $pull: { likedPosts: postId },
    });

    // Create notification for action
    await Notification.create({
      targetUser: targetUserId,
      message: "unliked your post",
      user: req.userId,
    });
    res.json(post);
  } catch (err) {
    res.json({ error: err.message });
  }
}

// SAVE AND UNSAVE POST
export async function savePost(req, res) {
  try {
    const { postId } = req.body;
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { saves: req.userId },
      },
      { new: true }
    )
      .populate({
        path: "creator",
        select: "username imageUrl fullname",
      })
      .populate({
        path: "comments",
        populate: { path: "user", select: "username imageUrl fullname" },
      });

    // Update user list of saved posts
    await User.findByIdAndUpdate(req.userId, {
      $push: { savedPosts: postId },
    });

    res.json(post);
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function unSavePost(req, res) {
  try {
    const { postId } = req.body;
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { saves: req.userId },
      },
      { new: true }
    )
      .populate({
        path: "creator",
        select: "username imageUrl fullname",
      })
      .populate({
        path: "comments",
        populate: { path: "user", select: "username imageUrl fullname" },
      });
    await User.findByIdAndUpdate(req.userId, {
      $pull: { savedPosts: postId },
    });
    res.json(post);
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function updatePost(req, res) {
  const image = req.files?.image;
  if (image) {
    const { url } = await uploadPhoto(image);
    req.body.imageUrl = url;
  }
  try {
    const post = await Post.findByIdAndUpdate(req.params.postId, req.body, {
      new: true,
    })
      .populate({
        path: "creator",
        select: "username imageUrl fullname",
      })
      .populate({
        path: "comments",
        populate: { path: "user", select: "username imageUrl fullname" },
      });
    res.json(post);
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function deletePost(req, res) {
  try {
    const post = await Post.findByIdAndDelete(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ error: err.message });
  }
}
