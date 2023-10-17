import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export function authenticate(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
  } catch (error) {
    req.userId = null;
  }
  next();
}
