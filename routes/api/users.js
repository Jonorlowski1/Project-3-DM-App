const router = require('express').Router();
const usersController = require('../../controllers/users');

// http://localhost:3001/api/v1/users/
router.route('/')
  .get(usersController.findAll)
  .post(usersController.create);

router.route('/:email')
  .get(usersController.findOne);

module.exports = router;
