module.exports = function(sequelize, dataTypes) {
  const Trail = sequelize.define("Trail", {
    name: {
      type: dataTypes.STRING,
      unique: true,
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
    },
    description: {
      type: dataTypes.TEXT
    },
    rating: {
      type: dataTypes.DECIMAL(3, 2)
    }
  });

  Trail.associate = function(models) {
    Trail.hasMany(models.Review);
    Trail.hasMany(models.Media);
    Trail.belongsTo(models.User);
  };
  return Trail;
};
