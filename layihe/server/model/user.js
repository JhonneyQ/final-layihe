
const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({

    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default: "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"},
    bio: { type: String, default: "Hello!" },
    favorites: {type:Array},
    likes: {type:Array},
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]

},
    { timestamps: true });

const userBlog = mongoose.model('user', userSchema);

module.exports = userBlog