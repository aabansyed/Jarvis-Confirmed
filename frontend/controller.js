$(document).ready(function () {
  // Hide start page and show blob animation
  eel.expose(hideStart);
  function hideStart() {
    $("#Start").attr("hidden", true);

    setTimeout(function () {
      $("#Oval").addClass("animate__animated animate__zoomIn");
      $("#Oval").attr("hidden", false);
    }, 1000);
  }

  // Immediately hide face auth UI elements if they exist
  $("#FaceAuth").attr("hidden", true);
  $("#FaceAuthSuccess").attr("hidden", true);
  $("#HelloGreet").attr("hidden", false);
});
