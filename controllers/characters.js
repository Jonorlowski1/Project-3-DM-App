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
    res.json(await db.Characters.findAll({ where: { GameId: req.params.id }, order: [['turn_order', 'ASC']] }));
  } catch (error) {
    res.status(500).send(error);
  }
};

const addMonster = async (req, res) => {
  console.log('TESTING');
  try {
    const monster = await db.Monsters.findOne({ where: { name: req.params.name } });
    console.log('MONSTER', monster);
    const character = await db.Characters.create({
      // where: { name: req.params.name },
      name: monster.name,
      initiative: 0,
      armor_class: monster.armor_class,
      hit_points: monster.hit_points,
      image: null,
      turn_order: 0,
      strength: monster.strength,
      dexterity: monster.dexterity,
      constitution: monster.constitution,
      intelligence: monster.intelligence,
      wisdom: monster.wisdom,
      charisma: monster.charisma,
      // game_id: req.params.game_id,
    });
    res.json(character);
  } catch (error) {
    res.status(500).send(error);
  }
};

// const findMonster = async (req, res) => {
//   try {
//     const monster = await monstersDb.find(m => m.name === req.params.name);
//     res.json(monster);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

const updateChar = async (req, res) => {
  try {
    res.json(await db.Characters.update(
      { hit_points: req.body.hit_points, initiative: req.body.initiative },
      { where: { id: req.params.id } },
    ));
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateTurnOrder = async (req, res) => {
  try {
    res.json(await db.Characters.bulkCreate(req.body.array, { updateOnDuplicate: ['turn_order', 'initiative'] }));
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
exports.addMonster = addMonster;
