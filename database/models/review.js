module.exports = function(sequelize, dataTypes) {
  const Review = sequelize.define("Review", {
    title: dataTypes.STRING,
    review: dataTypes.TEXT
  });
  Review.associate = function(models) {
    Review.hasMany(models.Media);
    Review.belongsTo(models.User);
  };

  return Review;
};
