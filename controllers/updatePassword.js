/* eslint-disable indent */
/* eslint-disable no-console */
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');

const db = require('../models');

// eslint-disable-next-line prefer-destructuring
const Op = Sequelize.Op;

const BCRYPT_SALT_ROUNDS = 10;
const updatePassword = async (req, res) => {
    db.Users.findOne({
        where: {
            email: req.body.email,
            resetPasswordToken: req.body.resetPasswordToken,
            resetPasswordExpires: {
                [Op.gt]: Date.now(),
            },
        },
    }).then((user) => {
        if (user == null) {
            console.error('password reset link is invalid or has expired');
            res.status(403).send('password reset link is invalid or has expired');
        } else if (user != null) {
            console.log('user exists in db');
            bcrypt
                .hash(req.body.password, BCRYPT_SALT_ROUNDS)
                .then((hashedPassword) => {
                    user.update({
                        password: hashedPassword,
                        resetPasswordToken: null,
                        resetPasswordExpires: null,
                    });
                })
                .then(() => {
                    console.log('password updated');
                    res.status(200).send({ message: 'password updated' });
                });
        } else {
            console.error('no user exists in db to update');
            res.status(401).json('no user exists in db to update');
        }
    });
}

exports.updatePassword = updatePassword;
