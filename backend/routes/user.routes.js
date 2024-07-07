import express from "express";
import { protectRoute } from "../middleware/protect.js";
import { getUserProfile ,followUnfollowUser ,getSugesstedUsers ,updateuser} from "../controllers/user.controller.js";


const userRouter = express.Router();
userRouter.get("/profile/:username",protectRoute, getUserProfile);
 userRouter.get("/suggested",protectRoute, getSugesstedUsers);
userRouter.post("/follow/:id",protectRoute, followUnfollowUser);
userRouter.post("/update",protectRoute, updateuser)

export default userRouter;