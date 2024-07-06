import express from "express";
import authRouter from "./routes/auth.routes.js";
import dotenv from "dotenv";
import cookieparser from "cookie-parser"
import ConnectMongoDb from "./db/connectMongoDb.js";
dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({extended:true}))

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
    console.log("server is running")
    ConnectMongoDb();
})