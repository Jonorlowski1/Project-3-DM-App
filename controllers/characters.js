const db = require('../models');

const monsterType = (type) => {
  switch (type) {
    case 'aberration':
      return './images/aberration.png';
    case 'beast':
      return './images/beast.png';
    case 'celestial':
      return './images/celestial.png';
    case 'construct':
      return './images/construct.png';
    case 'dragon':
      return './images/dragon.png';
    case 'elemental':
      return './images/elemental.png';
    case 'fey':
      return './images/fey.png';
    case 'fiend':
      return './images/fiend.png';
    case 'giant':
      return './images/giant.png';
    case 'humanoid':
      return './images/humanoid.png';
    case 'monstrosity':
      return './images/monstrosity.png';
    case 'ooze':
      return './images/ooze.png';
    case 'plant':
      return './images/plant.png';
    case 'swarm of Tiny beasts':
      return './images/swarm.png';
    case 'undead':
      return './images/undead.png';
    default: return './images/brute.png';
  }
}


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
    res.json(await db.Characters.findAll({ where: { game_id: req.params.id }, order: [['turn_order', 'ASC']] }));
  } catch (error) {
    res.status(500).send(error);
  }
};

const addMonster = async (req, res) => {
  try {
    const monster = await db.Monsters.findOne({ where: { name: req.params.name } });
    const character = await db.Characters.create({
      name: monster.name,
      initiative: (Math.floor(Math.random() * (20)) + 1),
      armor_class: monster.armor_class,
      hit_points: monster.hit_points,
      image: monsterType(monster.type),
      turn_order: 0,
      strength: monster.strength,
      dexterity: monster.dexterity,
      constitution: monster.constitution,
      intelligence: monster.intelligence,
      wisdom: monster.wisdom,
      charisma: monster.charisma,
      game_id: req.params.game_id,
      isMonster: true,
    });
    res.json(character);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateChar = async (req, res) => {
  try {
    res.json(await db.Characters.update(
      { name: req.body.name, hit_points: req.body.hit_points, initiative: req.body.initiative, armor_class: req.body.armor_class, strength: req.body.strength, dexterity: req.body.dexterity, constiution: req.body.constitution, intelligence: req.body.intelligence, wisdom: req.body.wisdom, charisma: req.body.charisma },
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
