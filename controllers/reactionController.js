const Reaction = require('../models/Reaction');

const ReactionController = {
  createReaction: async (req, res) => {
    try {
      const newReaction = new Reaction(req.body);
      await newReaction.save();
      res.status(201).json(newReaction);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  deleteReactionById: async (req, res) => {
    try {
      const deletedReaction = await Reaction.findByIdAndDelete(req.params.id);
      if (!deletedReaction) {
        return res.status(404).json({ error: 'Reaction not found' });
      }
      res.json({ message: 'Reaction deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },
};

module.exports = ReactionController;
