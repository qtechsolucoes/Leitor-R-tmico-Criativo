// backend/models/Rhythm.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const rhythmSchema = new Schema({
    name: String,
    pattern: Array,
    timeSignature: {
        beats: Number,
        beatType: Number
    },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: Date
});

mongoose.model('rhythms', rhythmSchema);