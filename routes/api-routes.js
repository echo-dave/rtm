const isAuthorized = require("../middleware/isAuthorized");
const db = require("../database/models");
const path = require("path");
module.exports = function(app) {
  app.get("/api/users", function(req, res) {
    db.User.findAll().then(function(data) {
      res.json(data);
    });
  });
  app.post("/api/auth/newuser", function(req, res) {
    console.log("body---------------");
    console.log(req.body);

    db.User.findAll({
      where: {
        name: req.body.name
      }
    }).then(function(isUser) {
      console.log("is user unique---------");
      console.log(isUser);
      //if user exists
      if (isUser.length > 0) {
        res.status(409).send({ err: "user name already taken" });
        throw new Error("User Exists");
        //else if a new user
      } else if (isUser.length == 0) {
        console.log("create--------------create");

        db.User.create(req.body)
          .then(function(data) {
            console.log("user ------------->");
            console.log(data);

            //make a login session
            req.session.user = data.dataValues;

            console.log("----------");
            console.log("session");
            console.log(req.session);
            //res.send("success");
            //res.redirect("/");
            return data;
            // return res.send("session started");
          })
          .catch(function(error) {
            res.send({ err: error });
          })
          .then(function(data) {
            console.log("creat then log data");
            console.log(data);
            console.log("file name------------>");
            //console.log(req.files.photo.name);
            if (req.files != null) {
              console.log("file--------------file");

              console.log(req.files);

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
                    req.files.photo.namelong =
                      req.files.photo.name.slice(0, -4) +
                      Date.now() +
                      req.files.photo.name.slice(-4);
                    console.log("upload success");
                  }
                }
              );

              db.Media.create({
                url: "/upload/" + req.files.photo.namelong,
                caption: req.files.photo.name.slice(0, -4),
                UserId: data.dataValues.id,
                media_type: req.files.photo.name.slice(-4)
              }).then(function(media) {
                db.User.update(
                  {
                    photo: media.dataValues.id
                  },
                  {
                    where: { id: media.dataValues.UserId }
                  }
                );
                res.send({ redirect: "/" });
              });
            } else {
              res.send({ redirect: "/" });
            }
          });
      }
    });
    //res.json();
  });

  app.post("/api/test", function(req, res) {
    console.log("page loaded-----------------");
    console.log(req.session.user.id);
    res.send("success");
  });
  app.post("/api/auth/login", function(req, res) {
    console.log(req.body);

    db.User.findOne({
      where: { name: req.body.name }
    }).then(async function(user) {
      if (await user.validPassword(req.body.pass)) {
        console.log("success");
        req.session.user = user.dataValues.id;
        console.log("req session -----------");
        console.log(req.session);
        res.send("success");
      } else {
        console.log("bad pass");
        res.send("bad pass");
      }
      console.log("user----------->");

      console.log(user);
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

  //new trail

  app.post("/api/trail/new", isAuthorized, function(req, res) {
    console.log(req.session);
    console.log("body -------------->");
    console.log(req.body);

    let uID = req.session.user.id;
    req.body.UserId = uID;
    db.Trail.create(req.body).then(function(trail) {
      console.log(trail);
      console.log("trail body above");

      res.json({ resourceURL: "/trail/" + req.body.name });
    });
  });

  app.get("/trail/:trail", function(req, res) {
    console.log("load trail");

    db.Trail.findOne({
      attributes: ["name", "city", "state"],
      where: {
        name: req.params.trail
      },
      include: [
        { model: db.User, attributes: ["name"] },
        {
          model: db.Review,
          attributes: ["title", "review"],
          include: [{ model: db.User, attributes: ["name"] }]
        }
      ]
    }).then(function(trailData) {
      res.render("trails", trailData.toJSON());
    });
  });
};
