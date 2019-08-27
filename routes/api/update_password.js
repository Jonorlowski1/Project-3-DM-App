const router = require('express').Router();
const updatePasswordController = require('../../controllers/updatePassword');

// http://localhost:3001/api/v1/updatepassword
router.route('/').put(updatePasswordController.updatePassword);

module.exports = router;