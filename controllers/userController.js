import { User } from "../models/User.js";

export async function getUser(req, res) {
  if (!req.userId) {
    res.json({ error: "Invalid token" });
    return;
  }
  const user = await User.findById(req.userId);
  res.json(user);
}

export async function getUserProfile(req, res) {
  const { username } = req.params;
  if (!req.userId) {
    res.json({ error: "Invalid token" });
    return;
  }
  const user = await User.findOne({ username });
  res.json(user);
}

export async function getUserFollowers(req, res) {
  const { username } = req.params;
  const user = await User.findOne({ username })
    .populate({
      path: "followers",
      populate: { path: "user", select: "username imageUrl fullname" },
    })
    .populate({
      path: "following",
      populate: { path: "user", select: "username imageUrl fullname" },
    });
  res.json(user);
}

export async function validateEmail(req, res) {
  const { email } = req.body;
  const user = await User.find({ email });
  res.json({ userExists: user.length ? true : false });
}

export async function validateUsername(req, res) {
  const { username } = req.body;
  const user = await User.find({ username });
  res.json({ userExists: user.length ? true : false });
}

export async function searchUsers(req, res) {
  const { q } = req.query;
  const users = await User.find().select(
    "username fullname imageUrl followers"
  );
  const searchedUsers = users.filter(
    (u) => u.username.includes(q) || u.fullname.includes(q)
  );
  res.json(searchedUsers);
}
