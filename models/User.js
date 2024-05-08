const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true // Trim whitespace from input
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ // Email format validation
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought' // Reference to the Thought model
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User' // Self-reference to other users for friends list
    }]
}, {
    toJSON: {
        virtuals: true, // Include virtual properties when JSON is sent
        getters: true // Apply getters (e.g., id instead of _id)
    },
    id: false // Disable virtuals getting an id (already have _id)
});

// Define a virtual called friendCount
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = mongoose.model('User', userSchema);

module.exports = User;