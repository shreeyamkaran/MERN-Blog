import mongoose from "mongoose";

export default mongoose.model("Blog", new mongoose.Schema({
    imageURL: {
        type: String,
        required: true
    },
    heading: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        ref: "User"
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
}));