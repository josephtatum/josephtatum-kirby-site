$(document).ready(function () {
  $(document).ready(function () {
    $("html.hidden").fadeIn(850).removeClass("hidden");
  });
  $('form[name="subscribe"]').submit(function (event) {
    event.preventDefault();

    const captchaResponse = grecaptcha.getResponse();

    if (!captchaResponse.length < 0) {
      throw new error("Captcha not checked. Get outta here, bot!");
    }

    const formData = {
      email: $("#email").val(),
    };
    $("#submit").html("Subscribing...");
    $("#submit").prop("disabled", true);
    $.ajax({
      type: "POST",
      url: "/verify-recaptcha",
      data: {
        captchaResponse,
      },
      dataType: "json",
      encode: true,
    }).done(function (res) {
      const data = JSON.parse(res);
      console.log(data.success);
      if (data.success) {
        $.ajax({
          type: "POST",
          url: "/subscribe",
          data: formData,
          dataType: "json",
          encode: true,
        })
          .done(function (data) {
            $("form").css("display", "none");
            $("#message").text(data.message);
            $("#message").css("display", "block");
          })
          .fail(function (jqXHR) {
            $("form").css("display", "none");
            $("#message").text(jqXHR.responseJSON.message);
            $("#message").css("display", "block");
          });
      } else {
        throw new Error("You seem to be a bot. bad bot! go away!");
      }
    });
    event.preventDefault();
  });
});
