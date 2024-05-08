const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reactionSchema = require('./reactionSchema'); // Import the reaction schema

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280 // Restrict to 280 characters
    },
    createdAt: {
        type: Date,
        default: Date.now // Set default value to current timestamp
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema], // Use reactionSchema as a subdocument schema
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    toJSON: {
        virtuals: true, // Include virtual properties when JSON is sent
        getters: true // Apply getters (e.g., createdAt formatted)
    },
    id: false // Disable virtuals getting an id (already have _id)
});

// Define a virtual called reactionCount
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Apply a getter method to format the timestamp on query
thoughtSchema.set('toObject', { getters: true });

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
