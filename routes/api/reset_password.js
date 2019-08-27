const router = require('express').Router();
const resetPasswordController = require('../../controllers/resetPassword');

// http://localhost:3001/api/v1/resetpassword
router.route('/:token').get(resetPasswordController.resetPassword);

module.exports = router;