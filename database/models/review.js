module.exports = function(sequelize, dataTypes) {
  const Review = sequelize.define("Review", {
    title: dataTypes.STRING,
    review: dataTypes.STRING
  });
  Review.associate = function(models) {
    Review.hasMany(models.Media);
  };

  return Review;
};
