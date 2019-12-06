$("#imageRemove").on("click", function(e) {
  $("input[name=photo]").val(null);
});
$("input[name=name").focus(function() {
  $("uError").remove();
});
$("#signUpForm").on("submit", function(e) {
  e.preventDefault();
  //remove input focus
  $("input").blur();
  $("#uNameErr").remove();

  /* const files = $("input[name=photo]").prop("files");
    const reader = new FileReader();
    console.log(files);
    reader.readAsDataURL(files[0]);
    reader.onload = function () { };
    console.log(this.result); */

  //        see if pass word fields match
  if ($("input[name=pass").val() == $("input[name=passTest]").val()) {
    console.log("validated");
    // let form = document.forms.namedItem("signUpForm")
    let form = document.querySelector("#signUpForm");
    // let form = document.forms;
    console.log(form);

    /*       const inputs = $('input[name!=passTest]').serializeArray();
                  console.log('inputs');
                  console.log(inputs); */

    let newInputs = new FormData(form);
    console.log("form data");

    //formData.append($("input[name!=passTest]").val());
    console.log(newInputs);
    newInputs.delete("passTest", "makeNewUser");
    //logging of FormData
    for (var [key, value] of newInputs.entries()) {
      console.log(key, value);
    }
    function uError() {
      $("form").append(`<h1 class="uNameErr">Username already in use<h1>`);
    }
    $.ajax({
      url: "/api/auth/newuser",
      data: newInputs,
      processData: false,
      contentType: false,
      type: "POST",
      409: function(res) {
        if (res == "Conflict") {
          uError();
        }
      }
    }).then(function(res) {
      //console.log(res.status);

      if (res.redirect) {
        console.log("is redirect");
        window.location = res.redirect;
      }
      console.log(res);
    });
  } else {
    $("label[for=passTest").before(
      `<span id="pwdErr"> Password mismatch</span>`
    );
  }
});

$("#loginForm").on("submit", function(event) {
  event.preventDefault();
  console.log($(this).serialize());

  $.post("/api/auth/login", $(this).serialize(), function(res) {
    console.log(res);
    if (res == "success") {
      $("#modal2").removeClass("is-active");
      $("#notLoggedIn").remove();
      $("a.login").hide();
      $("a.signup").hide();
    }
  });
});

$.get("/api/auth", function(res) {
  console.log(res);

  if (res.status == "authorized") {
    $("a.login").hide();
    $("a.signup").hide();
  }
});
