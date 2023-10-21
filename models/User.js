import mongoose, { mongo } from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: [true, "Please enter your fullname"] },
    username: {
      type: String,
      required: [true, "Please enter a username"],
      unique: [true, "Username already taken"],
      lowercase: true,
    },
    email: {
      type: String,
      unique: [true, "User alread exists"],
      required: [true, "Please enter your email"],
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      minlength: [6, "Password must be greater than 6 characters"],
    },
    imageUrl: { type: String, default: "placeholderProfileImage.png" },
    followers: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
    likedPosts: { type: [mongoose.SchemaTypes.ObjectId], default: [] },
    savedPosts: { type: [mongoose.SchemaTypes.ObjectId], default: [] },
    posts: { type: Number, default: 0 },
    about: { type: String },
  },
  { timestamps: true }
);

export const User = mongoose.model("user", UserSchema);
