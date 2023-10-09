import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    if (bcrypt.compare(password, user.password)) {
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
  const { name, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ status: "success", message: "User created successfully" });
  } catch (err) {
    res.status(400).json(err.message);
  }
}

//Generate JWT

function generateJwt(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
}
