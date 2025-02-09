
const mongoose = require('mongoose');
const { Schema } = mongoose;


const champSchema = new Schema({
  name: {type: String, required:true}, // String is shorthand for {type: String}
  type: {type: String, required:true},
  stats: {type: Object, required:true},
  image: {type: String, required:true},
  title: {type: String, required:true},
  icon: {type: String, required:true},
  description: {type: String, required:true},
  
},
{timestamps: true});

const ChampionBlog = mongoose.model('champions', champSchema);

module.exports = ChampionBlog