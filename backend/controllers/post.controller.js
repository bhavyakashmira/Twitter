import User from "../models/user.model.js";
import Post from "../models/post.models.js";
import Notification from "../models/notification.model.js";
import { v2 as cloudinary } from "cloudinary";

export const createPost = async (req, res) => {
    

    try {
        const { text } = req.body;
        let { img } = req.body;
        const userId = req.user._id.toString();
        const user = await User.findById(userId);
        if (!user) return res.json({ message: " user not found" });

        if (!text && !img) {
            return res.status(400).json({error:"Post must have text or image"})
        }

        if (img) {
            const uploadedResponse = await cloudinary.uploader.upload(img);
            img = uploadedResponse.secure_url;
        }


        const newPost = new Post({
            user: userId,text,img
        })

        await newPost.save();
        res.status(201).json(newPost)


    } catch (error) {
       console.log(error)
        res.status(500).json({ error: error.message });
        
    }
}


export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(400).json({ error: "Post Not found" });
        }

        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ error: " Not Authorized" });
        }

        if (post.img) {
            const ImgId = post.img.split("/").pop().split(".")[0];

            await cloudinary.uploader.destroy(ImgId)
        }


        await Post.findByIdAndDelete(req.params.id);
        
        res.status(201).json({message:"POst deleted"})
        
    } catch {
        console.log("Error in delete post controller")
        res.status(500).json({ error: error.message });
        
    }
}


export const CommentOnpost = async (req, res) => {
    try {
        const { text } = req.body;
        const postId = req.params.id;
        const userId = req.user._id;

        if (!text) {
            return res.status(400).json({ error: "Text field is required" });
        }
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const comment = { user: userId, text };

        post.comments.push(comment);
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        console.log("Error in commentOnPost controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


export const likeUnlikePost = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id: postId } = req.params;
        const post = await Post.findById(postId);
        if(!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        const userLikedPost = post.likes.includes(userId);

        if (userLikedPost) {
            await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
            await User.updateOne({ _id: userId }, { $pull: { likedPost: postId } })
            const updatedLikes = post.likes.filter((id) => id.toString() === userId.toString());
            res.status(200).json(updatedLikes)
        } else {

            post.likes.push(userId);
            await User.updateOne({ _id: userId }, { $push: { likedPost: postId } })
            await post.save();

            const notification = new Notification({
                from: userId,
                to: post.user,
                type:"like"
            })

            await notification.save();

            res.status(200).json(post.likes)
            
        }

    } catch (error) {

        console.log("error in like unlike", error.message);
        res.status(500).json({ error: "Interval Server error" });
        
    }
}

export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate({
            path: "user",
            select:"-password"
        }).populate({
            path: "comments.user",
            select:"-password"
        })
        if (posts.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(posts);
    
        
    } catch (error) {

        console.log("error", error);
        res.status(500).json({error :"Internal server error"})
        
    }
}

export const getLikedPost = async (req, res) => {
    
    try {
        
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message:"invalid user"})
        }

        const likedpost = await Post.find({ _id: { $in: user.likedPost } }).populate({
            path: "user",
            select :"-password"
        }).populate({
            path: "comments.user",
            select:"-password"
        });

        return res.status(200).json(likedpost);


        
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "inteval server error" });
    }
}


export const getFollowingPosts = async (req, res) => {

    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) return res.json({ error: "user not found" });
        const following = user.following;

        const feedPost = await Post.find({ user: { $in: following } }).sort({ createdAt: -1 }).populate({
            path: "user",
            select :"-password"
        }).populate(({
            path: "comments.user",
            select:"-password"
        }));

        res.status(200).json(feedPost);
        
    } catch(error) {
        
        console.log("error", error);
        res.status(500).json({ message: "inteval server error" });
    }
    
}

export const getUsersPost = async (req, res) => {
    try {

        const {username} = req.params;
        const user = await User.findOne({ username });
        if (!user) return res.json({ message: "user not found" });
        const posts = await Post.find({ user: user.id }).sort({ createdAt: -1 }).populate({
            path: "user",
            select :"-password"
        }).populate({
            path: "comments.user",
            select:"-password"
        });

        res.status(200).json(posts)
        
    } catch (error) {

        console.log("error", error);
        res.status(500).json({ message: "inteval server error" });
        
    }
}
