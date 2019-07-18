const bcrypt = require('bcrypt');
const db = require('../models');

const saltRounds = 10;

const create = async (req, res) => {
  try {
    await bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      // Store hash in your password DB.
      if (err) {
        console.error(err);
      } else {
        const user = db.Users.create({
          email: req.body.email,
          password: hash,
          admin: req.body.admin,
        });
        res.json(user);
        console.log(hash);
        return hash;
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const findAll = async (req, res) => {
  try {
    res.json(await db.Users.findAll({}));
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.create = create;
exports.findAll = findAll;