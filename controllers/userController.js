const User = require('../models/User');
const Thought = require('../models/Thought'); // Import the Thought model if needed

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate('thoughts friends');
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: 'User not found' });
    }
  },
  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (error) {
      res.status(400).json({ error: 'Invalid data' });
    }
  },
  updateUserById: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedUser);
    } catch (error) {
      res.status(404).json({ error: 'User not found' });
    }
  },
  deleteUserById: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      // BONUS: Remove user's associated thoughts
      await Thought.deleteMany({ user: req.params.id });
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(404).json({ error: 'User not found' });
    }
  },
};

module.exports = userController;
