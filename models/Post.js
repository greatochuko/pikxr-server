import mongoose, { mongo } from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    caption: { type: String, required: [true, "Please enter a caption"] },
    author: {
      username: { type: String },
      userId: {
        type: String,
        required: [true, "Please enter a user Id"],
        lowercase: true,
      },
    },
    imgUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("post", PostSchema);
