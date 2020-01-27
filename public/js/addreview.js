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
  //log form data
  // for (var [key, value] of form.entries()) {
  //   console.log(key, value);
  // }

  $.ajax({
    url: "/api/review/new",
    data: form,
    processData: false,
    contentType: false,
    type: "POST",
    error: function(req, status, err) {
      if (err == "Unauthorized") {
        uError();
      }
    }
  }).then(function(res) {
    // window.location.href = res.resourceURL;
    $("#newReview").hide();
    location.reload(true);
  });
});

function uError() {
  $("#newReview").append(
    `<span id="notLoggedIn">Please log in to proceed<span>`
  );
  $("a.login").show();
  $("a.signup").show();
  $("#modal2").addClass("is-active");
}

$("#reviewButton").on("click", function(e) {
  if ($("#newReview").css("display") == "none") {
    $("#newReview").show();
  } else {
    $("#newReview").hide();
  }
});
