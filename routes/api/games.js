const router = require('express').Router();
const gamesController = require('../../controllers/games');

router.route('/')
  .post(gamesController.create);

router.route('/:id')
  .get(gamesController.findAll)
  .post(gamesController.bindGame)
  .delete(gamesController.removeGame);


module.exports = router;