import mongoose, { mongo } from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    caption: { type: String, required: [true, "Please enter a caption"] },
    imageUrl: { type: String },
    creatorId: { type: mongoose.Schema.ObjectId },
    likes: { type: Number, default: 0 },
    coments: { type: Number, default: 0 },
    saves: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Post = mongoose.model("post", PostSchema);
