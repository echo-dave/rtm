const db = require("../database/models");

module.exports = function(app) {
  app.get("/api/users", function(req, res) {
    db.User.findAll().then(function(data) {
      res.json(data);
    });
  });
};
