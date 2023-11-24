import { User } from "../models/User.js";
import { uploadPhoto } from "../utils/uploadPhoto.js";

export async function getUser(req, res) {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function getUsers(req, res) {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function getUserProfile(req, res) {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    res.json(user);
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function getUserFollowers(req, res) {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username })
      .populate({
        path: "followers",
        select: "username imageUrl fullname",
      })
      .populate({
        path: "following",
        select: "username imageUrl fullname",
      });
    res.json(user);
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function validateEmail(req, res) {
  const { email } = req.body;
  try {
    const user = await User.find({ email });
    res.json({ userExists: user.length ? true : false });
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function validateUsername(req, res) {
  const { username } = req.body;
  try {
    const user = await User.find({ username });
    res.json({ userExists: user.length ? true : false });
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function searchUsers(req, res) {
  const { q } = req.query;
  try {
    const users = await User.find().select(
      "username fullname imageUrl followers"
    );
    const searchedUsers = users.filter(
      (u) =>
        u.username.toLowerCase().includes(q.toLowerCase()) ||
        u.fullname.toLowerCase().includes(q.toLowerCase())
    );
    res.json(searchedUsers);
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function followUser(req, res) {
  const { userToFollowId } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        $push: { following: userToFollowId },
      },
      { new: true }
    );
    await User.findByIdAndUpdate(userToFollowId, {
      $push: { followers: req.userId },
    });
    res.json(user);
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function unFollowUser(req, res) {
  const { userToUnFollowId } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        $pull: { following: userToUnFollowId },
      },
      { new: true }
    );
    await User.findByIdAndUpdate(userToUnFollowId, {
      $pull: { followers: req.userId },
    });
    res.json(user);
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function uploadCoverPhoto(req, res) {
  if (!req.files) return res.json({ error: "please select a file" });
  const { coverPhoto } = req.files;
  const { url } = await uploadPhoto(coverPhoto);
  try {
    await User.findByIdAndUpdate(req.userId, {
      coverPhotoUrl: url,
    });
    res.json("done");
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function uploadProfilePhoto(req, res) {
  if (!req.files) return res.json({ error: "please select a file" });
  const { profilePhoto } = req.files;
  const { url } = await uploadPhoto(profilePhoto);
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        imageUrl: url,
      },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function editUserAbout(req, res) {
  const { about, userId } = req.body;
  if (userId !== req.userId)
    return res.status(403).json({ error: "Forbidden" });
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { about },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json({ error: err.message });
  }
}
