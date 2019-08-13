module.exports = (sequelize, DataTypes) => {
  const Games = sequelize.define('Games', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    secret: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8]
      },
    },
  });

  Games.associate = (models) => {
    models.Games.hasMany(models.Characters, {
      onDelete: 'cascade',
      foreignKey: 'game_id',
    });
  };

  Games.associate = (models) => {
    models.Games.belongsToMany(models.Users, {
      through: 'users_games',
      foreignKey: 'game_id'
      // foreignKey: {
      //   allowNull: false,
      //   defaultValue: 1
      // }
    });
  };

  return Games;
}