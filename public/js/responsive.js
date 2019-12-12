/* #site-heading-column
#aside-column
window.innerWidth 778px */
export function responsive() {
  $(document).ready(function() {
    collapseColumn();
    swapSearch();
    $(window).on("resize", function() {
      if (window.innerWidth >= 769) {
        $("#site-heading-column").prependTo($("#titles"));
        $("#site-heading-column").css(
          "margin-bottom",
          "calc(1.5rem - 0.75rem)"
        );
      }
      if (window.innerWidth >= 921) {
        $("#searchbtn").appendTo("#searchCtrl");
      }
      collapseColumn();
      swapSearch();
    });
  });

  function collapseColumn() {
    if (window.innerWidth < 769) {
      $("#site-heading-column").prependTo($("#aside-column"));
      $("#site-heading-column").css("margin-bottom", "3rem");
    }
  }
  function swapSearch() {
    if (window.innerWidth <= 920) {
      $("#searchbtn").prependTo("#searchCtrl");
    }
  }
}
