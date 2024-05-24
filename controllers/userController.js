const { User, Thought } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find().select('-__v');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v')
                .populate([
                    { path: 'thoughts', select: '-__v' },
                    { path: 'friends', select: '-__v' },
                ]);

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const oldUser = await User.findOne({ _id: req.params.userId });
            const oldUsername = oldUser.username;

            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { username: req.body.username, email: req.body.email },
                { runValidators: true, new: true },
            );

            if (!user) {
                return res.status(404).json({ message: 'Unable to update user; please ensure you have provided a valid userId as the request parameter and a valid username and email in the request body.' });
            }

            const thoughtsUpdateResult = await Thought.updateMany(
                { username: oldUsername },
                { username: req.body.username },
                { runValidators: true },
            );

            if (thoughtsUpdateResult.modifiedCount === 0) {
                return res.json({ message: 'User successfully updated. No thoughts associated with the user were found, so no thoughts were updated.' });
            }

            res.json('User successfully updated. The user\'s thoughts were updated to reflect the new username as well.');
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({
                _id: req.params.userId,
            });

            if (!user) {
                return res.status(404).json({ message: 'User could not be deleted; no user found with this ID.' });
            }

            const thoughtsDeleteResult = await Thought.deleteMany({
                username: user.username,
            });

            if (thoughtsDeleteResult.deletedCount === 0) {
                return res.json({ message: 'User successfully deleted. No thoughts associated with the user were found, so no thoughts were deleted.' });
            }

            res.json({ message: 'User successfully deleted. The user\'s thoughts were deleted as well.' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true },
            );

            if (!user) {
                return res.status(404).json({ message: 'Friend could not be added; no user found with that ID.' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true },
            );

            if (!user) {
                return res.status(404).json({ message: 'Friend could not be removed; no user found with that ID.' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};