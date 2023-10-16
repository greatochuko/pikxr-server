import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    comment: { type: String, required: true },
    postId: { type: Schema.Types.ObjectId, required: true, ref: "post" },
    user: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("comment", commentSchema);
