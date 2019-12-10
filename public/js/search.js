$("#findTrails").on("click", function(e) {
  e.preventDefault();
  //console.log($("#search").val());
  let searchQ = {};
  searchQ.search = document.querySelector("#search").value;
  console.log(searchQ);

  $.get("/search/trails", searchQ, function(trails) {
    console.log(trails);

    $("#searchResults").append(`
<h2>${trails[0].name}</h2>
<h3>${trails[0].description}</h3>`);
  });
});
