import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    targetUser: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
    message: { type: String },
    isRead: { type: Boolean, default: false },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

export const Notification = mongoose.model("notification", NotificationSchema);
