module.exports = function(sequelize, dataTypes) {
  const Review = sequelize.define("Review", {
    title: dataTypes.STRING,
    review: dataTypes.STRING
  });
  (Review.associate = function(models) {
    Review.hasMany(models.Media);
    Review.belongsTo(models.User);
  }),
    {
      charset: "utf8",
      collate: "utf8mb4_unicode_520_ci"
    };

  return Review;
};
