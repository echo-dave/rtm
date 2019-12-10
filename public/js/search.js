$("#findTrails").on("click", function(e) {
  e.preventDefault();

  //console.log($("#search").val());
  let searchQ;
  // searchQ.search = document.querySelector("#search").value;
  searchQ = $("#search").val();

  if (searchQ.length == 0) {
    window.location = `/search/%20`;
  } else {
    window.location = `/search/${encodeURIComponent(searchQ)}`;
  }
});
