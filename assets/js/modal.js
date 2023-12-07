$(document).ready(function () {
  $("a[data-modal]").click(function (event) {
    $(this).modal({
      fadeDuration: 250,
    });
    return false;
  });
});
