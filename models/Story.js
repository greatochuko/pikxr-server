import mongoose from "mongoose";

const StorySchema = new mongoose.Schema(
  {
    caption: { type: String },
    imageUrl: { type: String },
    creator: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

export const Story = mongoose.model("story", StorySchema);
