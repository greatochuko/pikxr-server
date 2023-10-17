import mongoose from "mongoose";

const StorySchema = new mongoose.Schema(
  {
    imgUrl: { type: String },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

export const Stories = mongoose.model("story", StorySchema);
