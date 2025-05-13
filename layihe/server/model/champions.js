const mongoose = require('mongoose');
const { Schema } = mongoose;

const champSchema = new Schema({
    name: { type: String, required: true, trim: true }, // Ensure name is trimmed
    type: { type: String, required: true, trim: true }, // Ensure type is trimmed
    stats: {
        hp: { type: String , required: true }, // Health points as a number
        armor: { type: String,  required: true }, // Armor as a number
        mr: { type: String , required: true }, // Magic resistance as a number
    },
    image: { type: String, required: true}, // URL for the champion's image
    title: { type: String, required: true, trim: true }, // Champion's title
    icon: { type: String, required: true}, // URL for the champion's icon
    description: { type: String, required: true, trim: true }, // Champion's description
    background: { type: String, required: true}, // URL for the champion's background
    skills: {
        type: [String], // Array of strings for skills
        required: true,
        validate: {
            validator: function (skills) {
                return skills.length === 4; // Ensure there are exactly 4 skills
            },
            message: 'A champion must have exactly 4 skills.',
        },
    },
}, { timestamps: true });

const ChampionBlog = mongoose.model('champions', champSchema);

module.exports = ChampionBlog;