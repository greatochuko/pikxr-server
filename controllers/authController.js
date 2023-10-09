import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    if (user.password === password) {
      const { name } = user;
      const token = generateJwt(user._id);
      res.json({ name, token });
    } else {
      res.json({ error: "incorect password" });
    }
  } else {
    res.json({ error: "user does not exist" });
  }
}

export async function signup(req, res) {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

//Generate JWT

function generateJwt(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
}
