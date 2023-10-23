import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    caption: { type: String, required: [true, "Please enter a caption"] },
    imageUrl: { type: String },
    creator: { type: mongoose.Schema.ObjectId, required: true, ref: "user" },
    comments: {
      type: [
        {
          comment: { type: String },
          user: { type: mongoose.Schema.ObjectId, ref: "user" },
        },
      ],
      default: [],
    },
    likes: { type: [mongoose.SchemaTypes.ObjectId], default: [], ref: "user" },
    saves: { type: [mongoose.SchemaTypes.ObjectId], default: [], ref: "user" },
    shares: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Post = mongoose.model("post", PostSchema);
