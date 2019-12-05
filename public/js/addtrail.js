$("#newTrail").on("submit", function(e) {
  e.preventDefault();
  //get the form
  let form = document.querySelector("#newTrail");
  //put form into a new FormData object
  form = new FormData(form);

  $.ajax({
    url: "/api/trail/new",
    data: form,
    processData: false,
    contentType: false,
    type: "POST",
    error: function(req, status, err) {
      console.log(status);
      if (err == "Forbidden") {
        uError();
      }
    }
    // 403: uError()
  }).then(function(res) {
    //console.log(xhr.responseJSON);

    console.log(res);
    window.location.href = res.resourceURL;
  });
});

function uError() {
  $("#newTrail").append(
    `<span id="notLoggedIn">Please log in to proceed<span>`
  );
}
