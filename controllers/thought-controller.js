const { Thought, User, Reaction } = require('../models')

const thoughtController = {
    // All thoughts ( '/' GET request )
    async getThoughts (req, res) {
        try {
            const thoughtDataDb = await Thought.find().sort({createdAt:-1});
            res.status(200).json(thoughtDataDb)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    // A thought ( '/:id' GET request )
    async getSingThought(req, res) {
        try {
            const thoughtDataDb = await Thought.findOne({_id: req.params.thoughtId})
            if (!thoughtDataDb) {
                res.status(404).json({message: 'Cannot find thought with that ID'});
                return
            }
            res.status(200).json(thoughtDataDb)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    // Create thought ( '/' POST request )
    async createNewThought(req, res) {
        try {
            const thoughtDataDb = await Thought.create(req.body);
            const userDataDb = await User.findOneAndUpdate(
                {_id: req.body.userID },
                {$push: {thoughts: thoughtDataDb._id}},
                {new: true}
            )
            if (!thoughtDataDb) {
                res.status(404).json({message: 'Cannot find thought with that ID'});
                return
            }
            res.status(200).json({message: 'New thought is a success'});
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    
    // Delete a thought ( '/:id DELETE request ) 
    async deleteThought(req, res) {
        try {
            const thoughtDataDb = await Thought.findOneAndDelete({_id: req.params.thoughtId})
            if (!thoughtDataDb) {
                res.status(404).json({message: 'Cannot find thought with that ID'});
                return
            }
            res.status(200).json({message: "Thought is deleted successfully"})
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    // Update a thought ( '/:id' PUT request )
    async updateThought(req, res) {
        try {
            const thoughtDataDb = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$set: req.body},
                {runValidators: true, new: true}
            );
            if (!thoughtDataDb) {
                return res.status(404).json({message: 'Cannot find thought with that ID'});
            }
            res.status(200).json(thoughtDataDb);
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },


    // Add a reaction to a thought ( '/:thoughtID/reactions' POST request )
    async addReaction (req, res) {
        try {
            const thoughtDataDb = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtID},
                {$push: {reactions: req.body}},
                {runValidators: true, new: true}
            );
            if (!thoughtDataDb) {
                return res.status(404).json({message: 'Cannot find thought with that ID'})
            }

            res.status(200).json(thoughtDataDb)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    // Delete a reaction from a thought ( '/:thoughtID/reactions' DELETE request )
    async deleteReaction (req, res) {
        try {
            const thoughtDataDb = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtID},
                {$pull: {reactions: {reactionId: req.params.reactionId}}},
                {runValidators: true, new: true}
            );
            if (!thoughtDataDb) {
                return res.status(404).json({message: 'Cannot find thought with that ID'})
            }
            res.status(200).json(thoughtDataDb)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
};

module.exports = thoughtController;