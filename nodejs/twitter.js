module.exports = function() {
  require("dotenv").config();

  var Twitter = require("twitter");

  var client = new Twitter({
    consumer_key: process.env.consumerKey,
    consumer_secret: process.env.consumerSecret,
    bearer_token: process.env.bearerToken
  });

  client.get("search/tweets", { q: "Mountain Biking" }, function(err, res) {
    if (err) {
      // console.log(err);
    }
    //   console.log(res);
    let tweetLoop = [];
    let tweetImgloop = [];
    res.statuses.forEach(function(tweet) {
      //console.log("--------------------");

      if (tweet.entities.media) {
        // console.log(tweet.text);
        //console.log(tweet.entities.media[0].media_url);

        tweetLoop.push(tweet.text);
        tweetImgloop.push(tweet.entities.media[0].media_url);
      }
    });
    //[tweetLoop, tweetImgloop];
    return "helelelelelellele";
  });
  //console.log("--------------------------------------------");
  //console.log(res);
};
