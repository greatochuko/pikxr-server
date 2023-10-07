import { User } from "../models/User.js";

export function login(req, res) {
  res.json("login");
}

export async function signup(req, res) {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json(err.message);
  }
}
