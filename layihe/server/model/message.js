
const mongoose = require('mongoose');
const { Schema } = mongoose;


const messageSchema = new Schema({
    chatId: String,
    senderId: String,
    text: String
  
},
{timestamps: true},
);

const messageBlog = mongoose.model('message', messageSchema);

module.exports = messageBlog