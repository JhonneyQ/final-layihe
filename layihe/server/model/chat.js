
const mongoose = require('mongoose');
const { Schema } = mongoose;


const chatSchema = new Schema({
    members: Array,
  
},
{timestamps: true},
);

const ChatBlog = mongoose.model('chat', chatSchema);

module.exports = ChatBlog