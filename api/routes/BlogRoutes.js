import express from "express";
import Blog from "../models/Blog.js";
import User from "../models/User.js";

const blogRouter = express.Router();


blogRouter.get("/", async function(req, res) {
    try {
        const blogs = await Blog.find().sort({createdAt: -1});
        return res.json(blogs);
    }
    catch(error) {
        return res.json({message: error.message});
    }
});

blogRouter.post("/new/:author", async function(req, res) {
    try {
        const {author} = req.params;
        const {imageURL, heading, summary, description} = req.body;

        const user = await User.findOne({username: author});

        if(!imageURL || !heading || !summary || !description) {
            return res.json({message: "All fields are mandatory"});
        }

        const blog = await Blog.create({imageURL, heading, summary, description, author});
        user.blogs.push(blog._id);
        await user.save();

        return res.json({message: "Blog created successfully", blog});
    }
    catch(error) {
        return res.json({message: error.message});
    }
});

blogRouter.get("/desc/:id", async function(req, res) {
    try {
        const blogID = req.params.id;
        const blog = await Blog.findById(blogID);
        if(!blog) {
            return res.json({message: "No blog found"});
        }
        return res.json({message: "success", blog});
    }
    catch(error) {
        return res.json({message: error.message});
    }
});

blogRouter.delete("/:id", async function(req, res) {
    try {
        const {id} = req.params;
        const blog = await Blog.findByIdAndDelete(id);
        await User.findOneAndUpdate({username: blog.author}, {$pull: {blogs: id}});
        return res.json({message: "Blog deleted successfully"});
    }
    catch(error) {
        return res.json({message: error.message});
    }
});

blogRouter.patch("/:id", async function(req, res) {
    try {
        const {id} = req.params;
        const {imageURL, heading, summary, description} = req.body;

        if(!imageURL || !heading || !summary || !description) {
            return res.json({message: "All fields are mandatory"});
        }

        const blog = await Blog.findByIdAndUpdate(id, {imageURL, heading, summary, description, updatedAt: Date.now()});

        return res.json({message: "Blog updated successfully", blog});
    }
    catch(error) {
        return res.json({message: error.message});
    }
});


export default blogRouter;