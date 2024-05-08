const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const thoughtSchema = new Schema ({
    text: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
            ref: 'User'
        required: true
    },
    reactions: [{
        type: Schema.Types.ObjectId,
            ref: 'Reaction'
    }] // reference to reactions
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;