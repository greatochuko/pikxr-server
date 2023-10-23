import { Notification } from "../models/Notification.js";

export async function getNotifications(req, res) {
  const notifications = await Notification.find({ targetUser: req.userId })
    .populate({ path: "user", select: "username fullname imageUrl" })
    .sort({ createdAt: -1 });
  res.json(notifications);
}

export async function markNotificationsAsRead(req, res) {
  await Notification.updateMany(
    {
      targetUser: req.userId,
    },
    { isRead: true }
  );
  const notification = await Notification.find()
    .populate({
      path: "user",
      select: "username fullname imageUrl",
    })
    .sort({ createdAt: -1 });
  res.json(notification);
}
