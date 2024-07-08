import express from "express";
import authRouter from "./routes/auth.routes.js";
import dotenv from "dotenv";
import cookieparser from "cookie-parser"
import ConnectMongoDb from "./db/connectMongoDb.js";
import userRouter from "./routes/user.routes.js";
import { v2 as cloudinary } from "cloudinary";
import notificationRouter from "./routes/notification.routes.js";
import postRouter from "./routes/post.routes.js";
dotenv.config();


const PORT = process.env.PORT;
const app = express();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(express.json({limit:"5mb"}));
app.use(cookieparser());
app.use(express.urlencoded({extended:true}))

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/notification", notificationRouter)
app.listen(PORT, () => {
    console.log("server is running")
    ConnectMongoDb();
})