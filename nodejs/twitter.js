module.exports = function() {
  require("dotenv").config();
  var Twitter = require("twitter");
  var client = new Twitter({
    consumer_key: process.env.consumerKey,
    consumer_secret: process.env.consumerSecret,
    bearer_token: process.env.bearerToken
  });
  return new Promise(function(resolve, reject) {
    client.get(
      "search/tweets",
      { q: "filter:media mountain biking -filter:retweets" },
      function(err, res) {
        //console.log(res);
        // console.log(res.statuses);

        if (err) {
          reject(err);
        }
        let tweetLoop = [];
        let tweetImgloop = [];
        res.statuses.forEach(function(tweet) {
          if (tweet.entities.media) {
            tweetLoop.push(tweet.text);
            tweetImgloop.push(tweet.entities.media[0].media_url);
            // console.log("have media");
          } else {
            // console.log("no media");
          }
        });

        resolve([tweetLoop, tweetImgloop]);
      }
    );
  });
};
