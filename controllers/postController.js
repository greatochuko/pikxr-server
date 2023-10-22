import { Post } from "../models/Post.js";
import { User } from "../models/User.js";

export async function getPosts(req, res) {
  const posts = await Post.find()
    .populate({
      path: "creator",
      select: "username imageUrl fullname",
    })
    .populate({
      path: "comments",
      populate: { path: "user", select: "username imageUrl fullname" },
    })
    .sort({ createdAt: -1 });
  res.json(posts);
}

export function createPost(req, res) {
  const { caption, creator } = req.body;
  const { image } = req.files;
  const fileName = `${image.name.split(".")[0] + Date().now}.${
    image.name.split(".")[1]
  }`;
  image.mv("public/posts/" + fileName, async (err) => {
    if (err) {
      res.json({ error: err.message });
      return;
    }
    const newPost = await Post.create({
      caption: caption,
      creator: creator,
      imageUrl: fileName,
    })
      .populate({
        path: "creator",
        select: "username imageUrl fullname",
      })
      .populate({
        path: "comments",
        populate: { path: "user", select: "username imageUrl fullname" },
      });

    User.findByIdAndUpdate(req.userId, { $push: { posts: newPost._id } });

    res.json(newPost);
  });
}

export async function likePost(req, res) {
  const { postId, userId } = req.body;
  const post = await Post.findByIdAndUpdate(
    postId,
    {
      $inc: { likes: 1 },
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
  )
    .populate({
      path: "creator",
      select: "username imageUrl fullname",
    })
    .populate({
      path: "comments",
      populate: { path: "user", select: "username imageUrl fullname" },
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
  )
    .populate({
      path: "creator",
      select: "username imageUrl fullname",
    })
    .populate({
      path: "comments",
      populate: { path: "user", select: "username imageUrl fullname" },
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
  )
    .populate({
      path: "creator",
      select: "username imageUrl fullname",
    })
    .populate({
      path: "comments",
      populate: { path: "user", select: "username imageUrl fullname" },
    });
  await User.findByIdAndUpdate(
    userId,
    {
      $pull: { savedPosts: postId },
    },
    {
      path: "comments",
      populate: { path: "user", select: "username imageUrl fullname" },
    }
  );
  res.json(post);
}
