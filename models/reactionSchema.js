const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(), // Default value as a new ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280 // Maximum 280 characters
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Default value as the current timestamp
    }
});

// Apply a getter method to format the timestamp on query
reactionSchema.set('toObject', { getters: true });

module.exports = reactionSchema;