$("#findTrails").on("click", function(e) {
  e.preventDefault();

  runSearch(e);
});

$("#search").on("keydown", function(e) {
  console.log("key");

  if (e.key == "Enter") {
    console.log("return");
    runSearch(e);
  }
});

function runSearch(e) {
  let searchQ;
  // searchQ.search = document.querySelector("#search").value;
  searchQ = $("#search").val();

  if (searchQ.length == 0) {
    window.location = `/search/%20`;
  } else {
    window.location = `/search/${encodeURIComponent(searchQ)}`;
  }
}
