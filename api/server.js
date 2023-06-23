import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/UserRoutes.js";
import blogRouter from "./routes/BlogRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/blog", blogRouter);
dotenv.config();

async function connectDB() {
    try {
        await mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
        app.listen(process.env.PORT);
        console.log("Server running fine");
        console.log("DB connected successfully");
    }
    catch(error) {
        console.log(error.message);
    }
}
connectDB();