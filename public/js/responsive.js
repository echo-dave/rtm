/* #site-heading-column
#aside-column
window.innerWidth 778px */

$(document).ready(function() {
  let mobile;
  if (window.innerWidth <= 778) {
    $("#site-heading-column").prependTo($("#aside-column"));
    $("#site-heading-column").css("margin-bottom", "3rem");
    mobile = true;
  }
  $(window).on("resize", function() {
    if (window.innerWidth > 778 && mobile == true) {
      $("#site-heading-column").prependTo($("#titles"));
      $("#site-heading-column").css("margin-bottom", "calc(1.5rem - 0.75rem)");
    }
  });
});
