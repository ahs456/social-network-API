const { Thought, User } = require('../models')

const userController = {
    // All users ( '/' GET request )
    async getUser (req, res) {
        try {
            const userDataDb = await User.find({}).select('-__v').populate('thoughts').exec();
            return res.status(200).json(userDataDb)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    // Get a user ( '/:id' GET request )
    async getSingUser (req, res) {
        try {
            const userDataDb = await User.findOne({_id: req.params.userId})
            if (!userDataDb) {
                return res.status(404).json({message: 'Cannot find user with that ID'});
            }
            return res.status(200).json(userDataDb)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    // Create a new user ( '/' POST request )
    async createUser (req, res) {
        try {
            const userDataDb = await User.create(req.body)
            if (!userDataDb) {
                return res.status(404).json({message: 'User not created, check credentials and try again'});
            }
            return res.status(200).json(userDataDb)
        } catch (err) {
            console.error(err)
            res.status(500).json(err)
        }
    },
}

module.exports = userController;