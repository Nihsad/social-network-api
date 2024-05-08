const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThoughtById,
  deleteThoughtById,
  createReaction,
  deleteReactionById,
} = require('../controllers/thoughtController');

// Thoughts Routes
router.get('/', getAllThoughts);
router.get('/:thoughtId', getThoughtById);
router.post('/', createThought);
router.put('/:thoughtId', updateThoughtById);
router.delete('/:thoughtId', deleteThoughtById);

// Reactions Routes
router.post('/:thoughtId/reactions', createReaction);
router.delete('/:thoughtId/reactions/:reactionId', deleteReactionById);

module.exports = router;
