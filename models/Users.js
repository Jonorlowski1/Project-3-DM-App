module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      default: null,
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      default: null,
    },
  });

  // Users.associate = (models) => {
  //   Users.hasMany(models.Games, {
  //     onDelete: 'cascade'
  //   });
  // };

  Users.associate = (models) => {
    models.Users.belongsToMany(models.Games, {
      through: 'users_games',
      foreignKey: 'user_id'
      // foreignKey: {
      //   allowNull: false,
      //   defaultValue: 1
      // }
    });
  };

  return Users;
};