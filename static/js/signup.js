$(document).ready(() => {

  // When the signup button is clicked, we validate the email and password are not blank
  $("#createUserButton").on("click", function() {
    console.log("Create User Button Clicked");
    var newUser = {
      FirstName: $("#FirstName").val().trim(),
      LastName: $("#LastName").val().trim(),
      UserName: $("#UserName").val().trim(),
      Email: $("#Email").val().trim(),
      Password: $("#Password").val().trim()
    };

    if (!newUser.Email || !newUser.Password) {
      console.log("Email and/or Password was blank, try again.");
      return;
    }
    // If we have an email and password, then post the new user
    console.log("Values provided were: " + newUser.FirstName + ", " + newUser.LastName + ", " + newUser.UserName + ", " + newUser.Email + ", " + newUser.Password);
    $.ajax("/api/signup", {
      type: "POST",
      data: newUser
    })
      .then(() => {
        console.log("Reached API Signup then clause");
        window.location.replace("/profile");
      })
      .catch(handleLoginErr);
  });

  function handleLoginErr(err) {
    console.log(err);
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
