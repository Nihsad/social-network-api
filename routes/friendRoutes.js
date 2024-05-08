const express = require('express');
const router = express.Router();
const FriendController = require('../controllers/friendController');

// POST new friendship (add friend)
router.post('/', FriendController.addFriend);

// DELETE friendship (remove friend)
router.delete('/', FriendController.removeFriend);

module.exports = router;
