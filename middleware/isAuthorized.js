module.exports = function(req, res, next) {
  if (!req.session.user) {
    res.status(403).send("not logged in");
  } else {
    next();
  }
};
