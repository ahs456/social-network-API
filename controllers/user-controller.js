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
            console.log(err)
            res.status(500).json(err)
        }
    },

    // Delete a user (DELETE request '/:id')
    async deleteUser (req, res) {
        try {
          const userDataDb = await User.findOne({ _id: req.params.userId });
          if (!userDataDb) {
            return res.status(404).json({message: 'Cannot find user with that ID'});
          }
      
          await Thought.deleteMany({ username: userDataDb.username });
          await User.deleteOne({ _id: req.params.userId});
      
          res.status(200).json({message: 'User and attached thoughts removed from the Database!'});
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },

    // Update a user ( '/:id' PUT request )
    async updateUser (req, res) {
        try {
          const userDataDb = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
          );
      
          if (!userDataDb) {
            return res.status(404).json({message: 'Cannot find user with that ID'});
          }
      
          res.status(200).json(userDataDb);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
       

    // Add new friend ( POST request '/:userID/friends/:friendID' )
    async userFriend (req, res) {
        try {
          const friendDataDb = await User.findById(req.params.friendId);
      
          if (!friendDataDb) {
            return res.status(404).json({message: 'Cannot find friend with that ID, check and try again'});
          }
      
          const userDataDb = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: friendDataDb._id } },
            { new: true }
          );
      
          if (!userDataDb) {
            return res.status(404).json({message: 'No user found with that ID! Make sure the user ID is valid.',});
          }
      
          res.status(200).json(userDataDb);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
  

    // Remove a friend ( DELETE request '/:userID/friends/:friendID' )
    async removeFriend (req, res) {
        try {
          const friendDataDb = await User.findOne(req.params.friendID);
          if (!friendDataDb) {
            return res.status(404).json({message: 'Cannot find friend with that ID, check and try again'});
          }
      
          const userDataDb = await User.updateOne(
            { _id: req.params.userID },
            { $pull: { friends: friendDataDb._id } },
            { new: true }
          );
      
          if (!userDataDb) {
            return res.status(404).json({message: 'Cannot find user with that ID, check and try again'});
          }
      
          res.status(200).json(userDataDb);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      } 
}

module.exports = userController;