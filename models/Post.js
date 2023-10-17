import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    caption: { type: String, required: [true, "Please enter a caption"] },
    imageUrl: { type: String },
    creator: { type: mongoose.Schema.ObjectId, required: true, ref: "user" },
    likes: { type: Number, default: 0 },
    coments: { type: Number, default: 0 },
    saves: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Post = mongoose.model("post", PostSchema);
