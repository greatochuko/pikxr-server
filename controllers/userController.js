import { User } from "../models/User.js";

export async function getUser(req, res) {
  if (req.userId) {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } else {
    res.json({ error: "invalid token" });
  }
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
