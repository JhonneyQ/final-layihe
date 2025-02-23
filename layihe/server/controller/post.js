const postBlog = require("../model/posts");



const createPost = async (req, res) => {
    try {
        const { user_id, content } = req.body;

        const newPost = new postBlog({ user_id, content });
        await newPost.save();

        res.status(201).json({ message: "Post created successfully!", post: newPost });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPost
}