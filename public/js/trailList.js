$.get("/trail/all", function(data) {
  let traildata = data;

  for (let i = 0; i < traildata.length; i++) {
    $("#trail-list").append(`
        <div class="columns is-centered">
            <div class="column">
              <div class="box trailDetails frontpagelist">
       <a href="/trail/${encodeURIComponent(
         traildata[i].name
       )}"><h1 class="trailName title is-5">${traildata[i].name}<h1></a>
            <h3 class="trailLocation subtitle is-6">${traildata[i].city},${
      traildata[i].state
    }</h3>
            <p class="trailBody">${traildata[i].description}</p>
    </div>
</div>
</div>

`);
  }
});
$.get("/trail/recent", function(data) {
  let traildata = data;
  for (let i = traildata.length - 1; i > traildata.length - 5; i--) {
    $("#recent-trailList").prepend(`
      <div class="columns is-centered trailCols">
          <div class="column">
            <div class="trailDetails">
     <a href="/trail/${encodeURIComponent(
       traildata[i].name
     )}"><h1 class="trailName title is-5">${traildata[i].name}<h1></a>
          <h3 class="trailLocation subtitle is-6">${traildata[i].city},${
      traildata[i].state
    }</h3>
          <p class="trailBody">${traildata[i].description}</p>
  </div>
</div>
</div>

`);
  }
});
