const express = require('express');
const router = express.Router();
const ReactionController = require('../controllers/reactionController');

// POST new reaction
router.post('/', ReactionController.createReaction);

// DELETE reaction by ID
router.delete('/:id', ReactionController.deleteReactionById);

module.exports = router;
