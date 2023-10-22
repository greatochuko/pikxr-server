import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function login(req, res) {
  const { email, username, password } = req.body;
  const user =
    (await User.findOne({ email })) || (await User.findOne({ username }));
  if (user) {
    bcrypt.compare(password, user.password, (err, success) => {
      if (success) {
        const token = generateJwt(user._id);
        res.json({ token, user });
        return;
      }
      if (err) {
        res.json({ error: err.message });
        return;
      }
      res.json({ error: "Username or Password incorrect" });
    });
  } else {
    res.json({ error: "Username or Password incorrect" });
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
      token,
      user,
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
}

//Generate JWT

function generateJwt(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
}
