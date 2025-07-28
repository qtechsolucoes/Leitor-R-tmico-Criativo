// backend/models/User.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    displayName: String,
    email: String,
    photo: String,
    points: { type: Number, default: 0 },
    completedLessons: [{ type: Number }] 
});

mongoose.model('users', userSchema);