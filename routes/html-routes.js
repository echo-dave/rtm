const path = require('path');
module.exports = function (app) {

app.get(app.get(/(\/index)|(\/home)|(^\/$)/, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
}));
};