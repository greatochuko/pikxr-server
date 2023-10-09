import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded.id;
  console.log(decoded);
  next();
}
