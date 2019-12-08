$(document).ready(function() {
  $.get("/api/tweets", function(tweets) {
    console.log(tweets);
  });
});
