import mongoose, { mongo } from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    caption: { type: String, required: [true, "Please enter a caption"] },
    images: [String],
    creatorId: { type: mongoose.Schema.ObjectId },
    likes: { type: Number },
    coments: { type: Number },
    saves: { type: Number },
    shares: { type: Number },
  },
  { timestamps: true }
);

export const Post = mongoose.model("post", PostSchema);
