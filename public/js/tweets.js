// $(document).ready(function() {
window.onload = function() {
  $.get("/api/tweets", function(tweets) {
    for (let i = 0; i < tweets[0].length; i++) {
      $("#tweets").append(`
  <div class="container">
    <div class="twitterText">
    ${tweets[0][i]}
    <div/>
    <div class="tweetImage">
    <img src="${tweets[1][i]}" />
    </div>
  </div>
  `);
    }
  });
};
