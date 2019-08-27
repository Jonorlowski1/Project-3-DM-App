const router = require('express').Router();
const authRoutes = require('./auth');
const usersRoutes = require('./users');
const monsterRoutes = require('./monsters');
const gamesRoutes = require('./games');
const charactersRoutes = require('./characters');
const hueLights = require('./hue_lights');
const forgotPassword = require('./forgot_password');
const resetPassword = require('./reset_password');
const updatePassword = require('./update_password');

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/monsters', monsterRoutes);
router.use('/games', gamesRoutes);
router.use('/characters', charactersRoutes);
router.use('/huelights', hueLights);
router.use('/forgotpassword', forgotPassword);
router.use('/resetpassword', resetPassword);
router.use('/updatepassword', updatePassword);

module.exports = router;
