require("dotenv").config();

const axios = require("axios");

var Twitter = require("twitter");

// var keys = require("./keys.js");

// var twitter = keys.twitter;

var client = new Twitter({
  consumer_key: process.env.consumerKey,
  consumer_secret: process.env.consumerSecret,
  bearer_token: process.env.bearerToken
});

client.get("search/tweets", { q: "Mountain Biking" }, function(err, res) {
  if (err) {
    console.log(err);
  }
  //   console.log(res);

  res.statuses.forEach(function(tweet) {
    console.log("--------------------");

    if (tweet.entities.media) {
      console.log(tweet.text);
      console.log(tweet.entities.media[0].media_url);
    }
  });
});
console.log("--------------------------------------------");
//console.log(res);
