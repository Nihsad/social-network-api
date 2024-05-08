const Friend = require('../models/Friend');

const FriendController = {
  addFriend: async (req, res) => {
    try {
      const { user, friend } = req.body;
      const existingFriendship = await Friend.findOne({ user, friend });
      if (existingFriendship) {
        return res.status(400).json({ error: 'Friendship already exists' });
      }
      const newFriendship = new Friend({ user, friend });
      await newFriendship.save();
      res.status(201).json(newFriendship);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  removeFriend: async (req, res) => {
    try {
      const { user, friend } = req.body;
      const deletedFriendship = await Friend.findOneAndDelete({ user, friend });
      if (!deletedFriendship) {
        return res.status(404).json({ error: 'Friendship not found' });
      }
      res.json({ message: 'Friendship removed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },
};

module.exports = FriendController;
