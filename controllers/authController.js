import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    if (bcrypt.compare(password, user.password)) {
      const { fullName, username, email } = user;
      const token = generateJwt(user._id);
      res.json({ fullName, email, username, token });
    } else {
      res.json({ error: "incorect password" });
    }
  } else {
    res.json({ error: "user does not exist" });
  }
}

export async function signup(req, res) {
  const { username, fullname, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    username,
    fullname,
    email,
    password: hashedPassword,
  });
  try {
    const token = generateJwt(user._id);
    res.status(201).json({
      user: {
        id: user._id,
        fullname: user.fullname,
        username: user.username,
        followers: user.followers,
        followers: user.followers,
        posts: user.posts,
      },
      token,
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
}

//Generate JWT

function generateJwt(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
}
