const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    videoUrl: {type: String, required:true}
});

const postBlog = mongoose.model('post', PostSchema);

module.exports = postBlog