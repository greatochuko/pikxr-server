import { Router } from "express";
import { Notification } from "../models/Notification.js";
import {
  getNotifications,
  markNotificationsAsRead,
} from "../controllers/notificationControllers.js";
import { authenticate } from "../middleware/authMiddleware.js";

const notificationRouter = Router();

notificationRouter.get("/notifications", authenticate, getNotifications);
notificationRouter.post(
  "/notifications",
  authenticate,
  markNotificationsAsRead
);

export default notificationRouter;
