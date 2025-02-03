
const mongoose = require('mongoose');
const { Schema } = mongoose;


const reelsSchema = new Schema({
  videoUrl: {type: String, required:true}, // String is shorthand for {type: String}
  likes:  {type: Number, required:true},
  shares: {type: Number, required:true},
  comments: {type: Number, required:true},
  hashtags: {type: [String], required:true},
  creator: {type: String, required:true}
  
},
{timestamps: true});

const ReelBlog = mongoose.model('reels', reelsSchema);

module.exports = ReelBlog