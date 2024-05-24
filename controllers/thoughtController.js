const { Thought, User } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find().select('-__v');
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({
                _id: req.params.thoughtId,
            })
            .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID.' });
            }

            res.json(thought);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { runValidators: true, new: true },
            );

            if (!user) {
                return res.status(404).json({ message: 'Thought created, but no user was found with that ID.' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true },
            );

            if (!thought) {
                return res.status(404).json({ message: 'Thought could not be updated; no thought found with this ID.' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({
                _id: req.params.thoughtId,
            });

            if (!thought) {
                return res.status(404).json({ message: 'Thought could not be deleted; no thought found with this ID.' });
            }

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true },
            );

            if (!user) {
                return res.status(404).json({ message: 'Thought deleted, but no user was found with this thought.' });
            }

            res.json({ message: 'Thought successfully deleted.' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true },
            );

            if (!thought) {
                return res.status(404).json({ message: 'Reaction could not be added; no thought found with that ID.' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: req.body } },
                { new: true },
            );

            if (!thought) {
                return res.status(404).json({ message: 'Reaction could not be removed; no thought found with that ID.' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};