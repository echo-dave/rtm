$("#newReview").hide();
$("#imageRemove").on("click", function(e) {
  $("input[name=photo]").val(null);
});
$("#newReview").on("submit", function(e) {
  e.preventDefault();
  //get the form
  $("#title").attr("data-id");
  let form = document.querySelector("#newReview");
  //put form into a new FormData object
  form = new FormData(form);
  form.append("TrailId", $("#title").attr("data-id"));

  for (var [key, value] of form.entries()) {
    console.log(key, value);
  }

  $.ajax({
    url: "/api/review/new",
    data: form,
    processData: false,
    contentType: false,
    type: "POST",
    error: function(req, status, err) {
      console.log(status);
      if (err == "Unauthorized") {
        uError();
      }
    }
  }).then(function(res) {
    console.log(res);
    // window.location.href = res.resourceURL;
    $("newReview").hide();
  });
});

function uError() {
  $("#newReview").append(
    `<span id="notLoggedIn">Please log in to proceed<span>`
  );
  $("a.login").show();
  $("a.signup").show();
}

$("#reviewButton").on("click", function(e) {
  if ($("#newReview").css("display") == "none") {
    $("#newReview").show();
  } else {
    $("#newReview").hide();
  }
});
