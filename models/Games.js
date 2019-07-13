module.exports = (sequelize, DataTypes) => {
  const Games = sequelize.define('Games', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Games.associate = (models) => {
    models.Games.hasMany(models.Characters, {
      onDelete: 'cascade'
    });
  };

  Games.associate = (models) => {
    models.Games.belongsToMany(models.Games, { 
      as: 'Sessions',
      through: 'users_and_games',
      foreignKey: 'game_id'
      // foreignKey: {
      //   allowNull: false,
      //   defaultValue: 1
      // }
    });
  };

  return Games;
}