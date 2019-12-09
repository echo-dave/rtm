require("dotenv").config();
var Twitter = require("twitter");
var client = new Twitter({
  consumer_key: process.env.consumerKey,
  consumer_secret: process.env.consumerSecret,
  bearer_token: process.env.bearerToken
});
client.get("search/tweets", { q: "#biking" }, function(err, res) {
  if (err) {
    console.log(err);
  }
  res.statuses.forEach(function(tweet) {
    if (tweet.entities.media) {
      console.log(tweet.text);
      console.log(tweet.entities.media[0].media_url);
    }
  });
});
