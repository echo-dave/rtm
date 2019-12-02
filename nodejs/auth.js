const bcrypt = require("bcrypt");
function pHash(userPassword, cb) {
  const saltRounds = 10;
  return bcrypt.hashSync(userPassword, saltRounds);
}

exports.pHash = pHash;
