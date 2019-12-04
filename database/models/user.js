const bcrypt = require("bcrypt");
module.exports = function (sequelize, dataTypes) {
  const User = sequelize.define("User", {
    name: {
      type: dataTypes.STRING,
      allowNull: false,
      unique: true
    },
    photo: {
      type: dataTypes.INTEGER
    },
    pass: {
      type: dataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 50]
      }
    }
  });

  User.beforeCreate(user => {
    const saltRounds = 10;
    return bcrypt.hash(user.pass, saltRounds).then(hashedPw => {
      user.pass = hashedPw;
    });
  });

  User.prototype.validPassword = async function (pass) {
    return await bcrypt.compare(pass, this.pass);
  }

  User.associate = function (models) {
    User.hasMany(models.Media);
    User.hasMany(models.Review);
    User.hasMany(models.Trail);
  };
  return User;
};
