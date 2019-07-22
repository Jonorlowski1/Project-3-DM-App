const db = require('../models');

const create = async (req, res) => {
  try {
    const character = await db.Characters.create(req.body);
    res.json(character);
  } catch (error) {
    res.status(500).send(error);
  }
};

const findAll = async (req, res) => {
  try {
    res.json(await db.Characters.findAll({ order: [['turn_order', 'ASC']] }));
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateChar = async (req, res) => {
  try {
    res.json(await db.Characters.update(
      { hit_points: req.body.hit_points, initiative: req.body.initiative },
      { where: { id: req.params.id } }
    )
    );
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateTurnOrder = async (req, res) => {
  try {
    res.json(await db.Characters.bulkCreate(req.body.array, { updateOnDuplicate: ['turn_order'] }));
  } catch (error) {
    res.status(500).send(error);
  }
};

const destroy = async (req, res) => {
  try {
    res.json(await db.Characters.destroy({ where: { id: req.params.id } }));
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.create = create;
exports.findAll = findAll;
exports.destroy = destroy;
exports.updateChar = updateChar;
exports.updateTurnOrder = updateTurnOrder;
