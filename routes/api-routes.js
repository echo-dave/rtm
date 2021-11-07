const isAuthorized = require("../middleware/isAuthorized");
const db = require("../database/models");
const path = require("path");
const tweets = require("../nodejs/twitter.js");
const cloud = require("../nodejs/cloudinaryUp");
const Sequelize = require("sequelize");
const op = Sequelize.Op;
module.exports = function(app) {
  //login checker
  app.get("/api/auth", isAuthorized, function(req, res) {
    res.json({ status: "authorized" });
  });
  //all trail
  app.get("/trail/all", function(req, res) {
    db.Trail.findAll({
      attributes: ["name", "city", "state", "description"],
      include: [{ model: db.User, attributes: ["name"] }],
      order: [["name", "ASC"]]
    }).then(function(trails) {
      res.json(trails);
    });
  });
  //recent reviewed
  app.get("/trail/recent", function(req, res) {
    db.Trail.findAll({
      limit: 5,
      attributes: ["name", "city", "state", "description"],
      include: [{ model: db.User, attributes: ["name"] }, { model: db.Review }],
      order: [[db.Review, "createdAt", "DESC"]]
    }).then(function(trails) {
      res.json(trails);
    });
  });
  //search
  app.get("/search/:search", function(req, res) {
    // console.log(req.query.search);
    console.log(req.params.search);

    db.Trail.findAll({
      attributes: ["name", "city", "state", "description", "address"],
      where: {
        [op.or]: {
          name: {
            [op.like]: "%" + req.params.search + "%"
          },
          city: {
            [op.like]: "%" + req.params.search + "%"
          },
          state: req.params.search
        }
      },
      raw: true,
    })
      .then(function(trailSearch) {
        console.log(trailSearch);
        res.render("search", { data: trailSearch });

        // res.json(trail);
      })
      .catch(function(err) {
        console.log(err);
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
            req.session.user = data.dataValues.id;
            req.session.name = data.dataValues.name;

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
                res.send({ redirect: "/", userName: req.body.name });
              });
            } else {
              res.send({ redirect: "/", userName: req.body.name });
            }
          });
      }
    });
  });

  app.post("/api/auth/login", function(req, res) {
    console.log(req.body);

    db.User.findOne({
      where: { name: req.body.name }
    }).then(async function(user) {
      if (await user.validPassword(req.body.pass)) {
        console.log("success");
        req.session.user = user.dataValues.id;
        req.session.name = user.dataValues.name;
        console.log("req session -----------");
        console.log(req.session);
        res.send({ status: "success", userName: req.body.name });
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

  app.get("/api/tweets", function(req, res) {
    tweets().then(function(twitterRes) {
      console.log(twitterRes);
      res.json(twitterRes);
    });
  });

  //new trail

  app.post("/api/trail/new", isAuthorized, function(req, res) {
    console.log(req.session);
    console.log("body -------------->");
    console.log(req.body);

    let uID = req.session.user;
    req.body.UserId = uID;
    db.Trail.create(req.body).then(function(trail) {
      console.log(trail);
      console.log("trail body above");

      res.json({ resourceURL: "/trail/" + req.body.name });
    });
  });
  //dynamic trail url
  app.get("/trail/:trail", function(req, res) {
    console.log("load trail");

    db.Trail.findOne({
      attributes: ["id", "name", "city", "state", "address", "description"],
      where: {
        name: req.params.trail
      },
      include: [
        { model: db.User, attributes: ["name"] },
        {
          model: db.Review,
          attributes: ["UserId", "title", "review"],
          include: [
            { model: db.User, attributes: ["name"] },
            { model: db.Media, attribues: ["url"] }
          ]
        }, 
      ]
    }).then(function(trailData) {
      // console.log(trailData.toJSON());
      // res.json(trailData);
      res.render("trails", trailData.toJSON());
    });
  });

  //new review
  app.post("/api/review/new", isAuthorized, function(req, res) {
    req.body.UserId = req.session.user;
    console.log("req body");
    console.log(req.body);
    db.Review.create(req.body).then(function(data) {
      console.log("review data");

      console.log(data);

      if (req.files != null) {
        console.log("file--------------file");
        console.log(req.files);

        req.files.photo.namelong =
          req.files.photo.name.slice(0, -4) +
          "-" +
          Date.now() +
          req.files.photo.name.slice(-4);

        req.files.photo.mv(
          path.join(__dirname, "../public/upload", req.files.photo.namelong),
          function(err) {
            if (err) {
              console.log(err);
              res.send(err);
            } else {
              console.log("upload success");
              cloud(req.files.photo.namelong)
                /* .then(function(err, image) {
                console.log("upload");
                console.log(
                  "* public_id for the uploaded image is generated by Cloudinary's service."
                );
                console.log("* " + image.public_id);
                console.log("* " + image.url);
              })
              .catch(function (err){
                if (err) {
                  console.warn(err)
                } 
              })*/
                .then(function(imageurl) {
                  db.Media.create({
                    url: imageurl,
                    caption: req.files.photo.name.slice(0, -4),
                    UserId: req.body.UserId,
                    media_type: req.files.photo.name.slice(-4),
                    ReviewId: data.dataValues.id
                  }).then(function(media) {
                    res.send({ status: "done" });
                  });
                })
                .catch(function(err) {
                  if (err) {
                    console.warn(err);
                  }
                });
            }
          }
        );
      } else {
        res.send({ status: "done" });
      }
    });
  });
};
