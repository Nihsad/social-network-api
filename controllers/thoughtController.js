const Thought = require('../models/Thought');

const thoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },
  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      res.json(thought);
    } catch (error) {
      res.status(404).json({ error: 'Thought not found' });
    }
  },
  createThought: async (req, res) => {
    try {
      const newThought = await Thought.create(req.body);
      res.json(newThought);
    } catch (error) {
      res.status(400).json({ error: 'Invalid data' });
    }
  },
  updateThoughtById: async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
      res.json(updatedThought);
    } catch (error) {
      res.status(404).json({ error: 'Thought not found' });
    }
  },
  deleteThoughtById: async (req, res) => {
    try {
      await Thought.findByIdAndDelete(req.params.thoughtId);
      res.json({ message: 'Thought deleted successfully' });
    } catch (error) {
      res.status(404).json({ error: 'Thought not found' });
    }
  },
  createReaction: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      thought.reactions.push(req.body); // Assuming req.body contains reaction data
      await thought.save();
      res.json(thought);
    } catch (error) {
      res.status(400).json({ error: 'Invalid data' });
    }
  },
  deleteReactionById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      thought.reactions.pull({ _id: req.params.reactionId });
      await thought.save();
      res.json({ message: 'Reaction deleted successfully' });
    } catch (error) {
      res.status(404).json({ error: 'Reaction not found' });
    }
  },
};

module.exports = thoughtController;
