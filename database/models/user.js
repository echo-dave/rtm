module.exports = function(sequelize, dataTypes) {
  const User = sequelize.define("User", {
    name: {
      type: dataTypes.STRING,
      allowNull: false
    },
    photo: {
      type: dataTypes.STRING
    },
    pass: {
      type: dataTypes.STRING
    }
  });
  User.associate = function(models) {
    User.hasMany(models.Media, {
      onDelete: "cascade"
    });
  };
  return User;
};
