import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

const userRouter = express.Router();
dotenv.config();


userRouter.post('/register', async function(req, res) {
    try {
        const {username, password} = req.body;
        let user = await User.findOne({username: username});
        if(user) {
            return res.json({message: "User already exists"});
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({username: username, password: hashedPassword});

        return res.json({message: "User registered successfully", user});
    }
    catch(error) {
        return res.json({message: error.message});
    }
});

userRouter.post('/login', async function(req, res) {
    try {
        const {username, password} = req.body;
        let user = await User.findOne({username: username});
        if(!user) {
            return res.json({message: "Invalid username or password"});
        }

        const passwordCheck = await bcrypt.compare(password, user.password);
        if(!passwordCheck) {
            return res.json({message: "Invalid username or password"});
        }
        
        await jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET, {}, function(error, token) {
            if(error) {
                return res.json({message: "Something went wrong. Try again later."});
            }

            res.json({message: "User logged in successfully", token, username: user.username});
        })
    }
    catch(error) {
        return res.json({message: error.message});
    }
});

userRouter.get("/profile/:token", async function(req, res) {
    try {
        const {token} = req.params;
        await jwt.verify(token, process.env.JWT_SECRET, {}, function(error, info) {
            if(error) {
                return res.json({message: "Something went wrong. Try again later"});
            }

            return res.json(info);
        })
    }
    catch(error) {
        return res.json({message: error.message});
    }
});

export default userRouter;