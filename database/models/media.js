module.exports = function(sequelize, dataTypes) {
  const Media = sequelize.define("Media", {
    caption: {
      type: dataTypes.STRING,
      defaultValue: null
    },
    media_type: {
      type: dataTypes.STRING,
      allowNull: false
    },
    url: {
      type: dataTypes.STRING
    }
  });

  return Media;
};
