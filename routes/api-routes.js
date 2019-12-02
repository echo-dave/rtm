const db = require("../database/models");
const auth = require("../nodejs/auth");
module.exports = function(app) {
  app.get("/api/users", function(req, res) {
    db.User.findAll().then(function(data) {
      res.json(data);
    });
  });
  app.post("/api/auth/newuser", function(req, res) {
    console.log(req.body);
    db.User.create(req.body).then(function(data) {
      console.log(data);
      res.end();
    });
    res.json();
  });
};
