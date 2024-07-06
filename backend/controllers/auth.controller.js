import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { generateTokenandSetCookie } from "../lib/utils/generateTokenAndSetCookies.js";


export const signup = async (req, res) => {

    try {
        const { username, fullName, password, email } = req.body;
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            return res.status(401).json({
                message:" INVALID EMAIL format"
            })
        }
        const existinguser = await User.findOne({username})
        if (existinguser){
            return res.status(400).json({error :" uSer already exsts"})
        }
        const existingemail = await User.findOne({ email })
        if (existingemail) {
            return res.status(400).json({ error: "email already exsts" })
        }
        if (password.length < 6) {
            return res.json({message:"password too short"})
        }
        //hash 
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName: fullName,
            username: username,
            email: email,
            password:hashpassword
        })
        if (newUser) {
            generateTokenandSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({ 
                _id :newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
                coverImg:newUser.coverImg
             });
        } else {
            res.status(500).json({
                message: "Invalid user data"
            }) 
        }

 


        
    } catch (error) {

        console.log(error)
        res.status(500).json({
            message: "Invalid user data"
        }) 

       


        
    }
 
}
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const ispassword = await bcrypt.compare(password, user?.password || "")

        if (!user || !ispassword) {
            return res.json({ message: "user/password does not exists" })
        }

        generateTokenandSetCookie(user._id, res);
        res.status(200).json({
            message: "user logged In"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Invalid user data"
        })

    }
}

export const logout = async (req, res) => {
   
    try {

        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({message:"Logged Out successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "loggin out error"
        })
        
    }
}


export const getMe = async (req, res) => {
    try {

        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);
        
    } catch (error) {
        
        console.log("error in get me controller", error.message);
        res.status(500).json({
            error:"Interal sever error"
        })
        
    }
}