const router = require('express').Router();
const forgotPasswordController = require('../../controllers/forgotPassword');

// http://localhost:3001/api/v1/forgotpassword
router.route('/').post(forgotPasswordController.forgotPassword);

module.exports = router;