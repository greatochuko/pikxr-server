import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    postId: { type: Schema.Types.ObjectId, required: true },
    comment: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("comment", commentSchema);
