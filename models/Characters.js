module.exports = (sequelize, DataTypes) => {
  const Characters = sequelize.define('Characters', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    initiative: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        len: [1],
      },
    },
    armor_class: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        len: [1],
      },
    },
    hit_points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        len: [1],
      },
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: false,
      allowNull: true,
    },
    turn_order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    strength: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dexterity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    constitution: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    intelligence: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    wisdom: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    charisma: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isMonster: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false
    }
  });

  Characters.associate = (models) => {
    models.Characters.belongsTo(models.Games, {
      foreignKey: 'game_id',
      onDelete: 'CASCADE',
    });
  };

  return Characters;
}
