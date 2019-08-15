const router = require('express').Router();
const gamesController = require('../../controllers/games');

router.route('/')
  .post(gamesController.create);

router.route('/:id')
  .get(gamesController.findAll)
  .post(gamesController.bindGame)
  .put(gamesController.removeGame)
  .delete(gamesController.deleteGame);


module.exports = router;