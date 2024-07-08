import express from "express";
import { protectRoute } from "../middleware/protect.js";
import { getNotifications,deleteNotification ,deleteOneNotification } from "../controllers/notification.controller.js";
const notificationRouter = express.Router();


notificationRouter.get("/", protectRoute, getNotifications);
notificationRouter.delete("/", protectRoute, deleteNotification)
notificationRouter.delete("/:id" , protectRoute,deleteOneNotification)


export default notificationRouter;