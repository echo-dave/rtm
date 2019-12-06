$.get("/trail/all", function(data) {
  console.log(data);
  let traildata = data;
  console.log(traildata);

  for (let i = 0; i < traildata.length; i++) {
    $("#trail-list").append(`
        <div class="columns is-centered">
            <div class="column">
              <div class="box trailDetails frontpagelist">
        <h1 class="trailName title is-5">${traildata[i].name}<h1>
            <h3 class="trailLocation subtitle is-6">${traildata[i].city},${traildata[i].state}</h3>
            <p class="trailBody">${traildata[i].description}</p>
    </div>
</div>
</div>

`);
  }
});