require("dotenv").config();
const session = require("express-session");
var cookieParser = require("cookie-parser");

const db = require("./database/models");
//check environment
const env = process.env.NODE_ENV || "development";

const fileUpload = require("express-fileupload");

//express
const express = require("express");
const app = express();
PORT = process.env.PORT || 8080;

//middleware
app.use(cookieParser());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    key: "user_sid",
    secret: "utrduybuyfiytfiytfiyg",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000
    }
  })
);

//static options
let options = {
  dotfiles: "ignore",
  etag: false,
  extensions: ["html"],
  maxAge: "1d",
  redirect: false
};

//static route
app.use(express.static("public", options));
//bulma route
app.use(express.static("node_modules/bulma/css"));
//routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
//404 not found
app.use(function(req, res) {
  res.status(400).sendFile(__dirname + "/public/404.html");
});

//model sync and start listening express webserver
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("listening " + PORT);
    console.log("environment: " + env);
  });
});
