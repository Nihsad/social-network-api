const Thought = require('../models/Thought');

const ThoughtController = {
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
      const thought = await Thought.findById(req.params.id);
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  createThought: async (req, res) => {
    try {
      const newThought = new Thought(req.body);
      await newThought.save();
      res.status(201).json(newThought);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  updateThoughtById: async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json(updatedThought);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  deleteThoughtById: async (req, res) => {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.id);
      if (!deletedThought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json({ message: 'Thought deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },
};

module.exports = ThoughtController;
