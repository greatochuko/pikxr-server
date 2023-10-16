import { User } from "../models/User.js";

export async function getUser(req, res) {
  const user = await User.findById(req.params.id).select("-password");
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
