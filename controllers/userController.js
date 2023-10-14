import { User } from "../models/User.js";

export async function getUser(req, res) {
  res.json(req.user || "unable to get user");
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
