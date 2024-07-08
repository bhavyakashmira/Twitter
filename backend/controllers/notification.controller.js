import Notification from "../models/notification.model.js";
import Post from "../models/post.models.js";

export const getNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        const notification = await Notification.find({ to: userId }).populate({
            path: "from",
            select:"username profileImg"
        })


        await Notification.updateMany({ to: userId }, { read: true });
        res.status(200).json(notification);

         
    } catch(error){
        console.log("error", error.message);
        res.status(400).json({ message: "Internal Server Error" });
     }
}


export const deleteNotification = async (req, res) => {
    

    try {
        const userId = req.user._id;
        await Notification.deleteMany({ to: userId });
        res.status(200).json({message:"Notification deleted successfully"})
        
    } catch(error) {
        console.log("error", error);
        res.status(400).json({ message: "Internal Server Error" });
    }
}

export const deleteOneNotification = async (req, res) => {
    
    try {

        const { id } = req.params;
         await Post.findByIdAndDelete(id);

        res.status(200).json({ message: "Notification deleted successfully" })

        
    } catch (error) {
        console.log("error", error);
        res.status(400).json({ message: "Internal Server Error" });   
    }
}