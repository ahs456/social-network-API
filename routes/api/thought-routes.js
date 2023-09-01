const router = require('express').Router();
const thoughtController = require('../../controllers/thoughtController');

router
    .route('/')
        .get(thoughtController.getThoughts)
        .post(thoughtController.createNewThought);

router
    .route('/:id')
        .get(thoughtController.getSingThought)
        .put(thoughtController.updateThought)
        .delete(thoughtController.deleteThought);
router
    .route('/:thoughtID/reactions')
        .post(thoughtController.addReaction)
        .delete(thoughtController.deleteReaction);

module.exports = router;