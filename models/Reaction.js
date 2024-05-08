const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reactionSchema = new Schema ({
    emoji: {
        type: String,
        required: true
    },
    thought: {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;