const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    friend: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Friend = mongoose.model('Friend', friendSchema);

modile.exports = Friend;