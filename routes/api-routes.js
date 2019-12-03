const db = require("../database/models");
const path = require("path");
module.exports = function(app) {
  app.get("/api/users", function(req, res) {
    db.User.findAll().then(function(data) {
      res.json(data);
    });
  });
  app.post("/api/auth/newuser", function(req, res) {
    console.log(req.body);
    console.log("file--------------file");

    console.log(req.files);
    console.log("create--------------create");

    db.User.create(req.body).then(function(data) {
      console.log("user ------------->");
      console.log(data);
      req.session.user = data.dataValues;

      console.log("----------");
      console.log("session");
      console.log(req.session);
      res.send("success");
      //req.session.user = user.dataValues;
      //res.redirect("/");

      // return res.send("session started");
    });
    //res.json();
  });
  app.post("/api/auth/login", function(req, res) {
    console.log(req.body);

    db.User.findOne({
      where: { name: req.body.name }
    }).then(async function(user) {
      if (await user.validPassword(req.body.pass)) {
        console.log("success");
        res.send("success");
      } else {
        console.log("bad pass");
        res.send("bad pass");
      }
      //console.log(user);
    });
  });

  app.post("/upload", function(req, res) {
    console.log("file upoad route--------------------");

    console.log(req.files); // the uploaded file object
    req.files.photo.mv(
      path.join(
        __dirname,
        "../public/upload",
        req.files.photo.name.slice(0, -4) +
          Date.now() +
          req.files.photo.name.slice(-4)
      ),
      function(err) {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          req.files.photo.name =
            req.files.photo.name.slice(0, -4) +
            Date.now() +
            req.files.photo.name.slice(-4);

          console.log("upload success");

          return res.send("success: " + req.files.photo.name);
        }
      }
    );
    // res.json();
  });
};
