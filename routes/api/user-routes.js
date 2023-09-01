const router = require('express').Router();
const userController = require('../../controllers/userController');

router
    .route('/')
        .get(userController.getUser)
        .post(userController.createUser);

router
    .route('/:id')
        .get(userController.getSingUser)
        .put(userController.updateUser)
        .delete(userController.deleteUser);
router
    .route('/:userID/friends/:friendID')
        .post(userController.userFriend)
        .delete(userController.removeFriend);

module.exports = router;