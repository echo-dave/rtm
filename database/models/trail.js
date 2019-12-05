module.exports = function(sequelize, dataTypes) {
  const Trail = sequelize.define("Trail", {
    name: {
      type: dataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 100]
      }
    },
    city: {
      type: dataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 100]
      }
    },
    state: {
      type: dataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2]
      }
    },
    address: {
      type: dataTypes.STRING
    }
  });

  Trail.associate = function(models) {
    Trail.hasMany(models.Review);
    Trail.hasMany(models.Media);
    Trail.belongsTo(models.User);
  };
  return Trail;
};
