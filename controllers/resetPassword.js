/* eslint-disable no-console */
/* eslint-disable max-len */
const Sequelize = require('sequelize');

const db = require('../models');

// eslint-disable-next-line prefer-destructuring
const Op = Sequelize.Op;


const resetPassword = async (req, res) => {
    db.Users.findOne({
        where: {
            resetPasswordToken: req.params.token,
            resetPasswordExpires: {
                [Op.gt]: Date.now(),
            },
        },
    }).then((user) => {
        if (user == null) {
            console.error('password reset link is invalid or has expired');
            res.status(403).send('password reset link is invalid or has expired');
        } else {
            res.status(200).send({
                email: user.email,
                message: 'password reset link a-ok',
            });
        }
    });
};

exports.resetPassword = resetPassword;