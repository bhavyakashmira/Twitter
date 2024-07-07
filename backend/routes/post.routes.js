import express from "express";
import { protectRoute } from "../middleware/protect.js";
import { createPost, CommentOnpost, getUsersPost, getLikedPost, deletePost, getFollowingPosts ,likeUnlikePost, getAllPost } from "../controllers/post.controller.js";
const postRouter = express.Router();

postRouter.get("/all", protectRoute, getAllPost);
postRouter.get("/user/:username", protectRoute, getUsersPost);
postRouter.get("/following", protectRoute, getFollowingPosts);
postRouter.get("/likes/:id", protectRoute , getLikedPost)
postRouter.post("/create", protectRoute, createPost)
postRouter.post("/like/:id", protectRoute, likeUnlikePost)
postRouter.post("/comment/:id", protectRoute, CommentOnpost)
postRouter.delete("/:id", protectRoute, deletePost)

export default postRouter;