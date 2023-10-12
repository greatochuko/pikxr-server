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
  const { username, fullName, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      fullName,
      email,
      password: hashedPassword,
    });
    const token = generateJwt(user._id);
    res.status(201).json({ fullName, email, username, token });
  } catch (err) {
    res.status(400).json(err.message);
  }
}

//Generate JWT

function generateJwt(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
}
