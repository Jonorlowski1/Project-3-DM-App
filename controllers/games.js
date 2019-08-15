const db = require('../models');

const create = async (req, res) => {
  try {
    const game = await db.Games.create(req.body);
    db.Users.findOne({ where: { id: req.body.user_id } }).then((user) => { user.addGames(game.id); });
    // db.Users.addGame(game.dataValues.id, { user_id: req.body.user_id });
    res.json(game);
  } catch (error) {
    res.status(500).send(error);
  }
};

const findAll = async (req, res) => {
  try {
    res.json(await db.Games.findAll({
      include: [{
        model: db.Users,
        where: { id: req.params.id }
      }]
    }));
  } catch (error) {
    res.status(500).send(error);
  }
};

const bindGame = async (req, res) => {
  try {
    res.json(await db.Games.findOne({ where: { secret: req.body.secret } }).then((game) => { game.addUsers(req.params.id); }));
  } catch (error) {
    res.status(500).send(error);
  }
}

const removeGame = async (req, res) => {
  try {
    console.log(req.body);
    res.json(await db.Games.findOne({ where: { secret: req.body.secret } }).then((game) => { game.removeUsers(req.params.id); }));
  } catch (error) {
    res.status(500).send(error);
  }
}

const deleteGame = async (req, res) => {
  try {
    res.json(await db.Games.destroy({ include: [{ model: db.Characters }], where: { id: req.params.id } }));
  }
  catch (error) {
    res.status(500).send(error);
  }
}

exports.create = create;
exports.findAll = findAll;
exports.bindGame = bindGame;
exports.removeGame = removeGame;
exports.deleteGame = deleteGame;
