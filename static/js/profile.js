$(document).ready(() => {
  // Handle Save Bike Button.
  $("#saveNewBikeButton").on("click", function() {
    var newBike = {
      BikeName: $("#BikeName").val().trim(),
      Year: parseInt($("#BikeYear").val(),10),
      Make: $("#BikeMake").val().trim(),
      Model: $("#BikeModel").val().trim(),
    };

    $.ajax("/api/bike", {
      type: "POST",
      data: newBike
    }).then(
      function() { location.reload(); }
    );
  });

  // Handle the Delete Visited button.
  $("#addBikeButton").on("click", function(event) {
    event.preventDefault();
    $("#addBikeButton").toggleClass("hide-me");
    $("#addBikeForm").toggleClass("hide-me");
  });

  // Edit profile info toggle
  $(".editProfile").on("click", function(event) {
    event.preventDefault();
    $("#editProfileInfo").toggleClass("hide-me");
    $("#profileInfo").toggleClass("hide-me");
  });

  // Save changes to user profile
  $("#saveProfileEdits").on("click", function() {
    var userID = $(this).data("userid");
    var updateUserProfile = {
      userID,
      FirstName: $("#FirstName").val().trim(),
      LastName: $("#LastName").val().trim(),
      UserName: $("#UserName").val().trim(),
      Email: $("#Email").val().trim()
    }

    $.ajax("/profile", {
      type: "PUT",
      data: updateUserProfile
    }).then(
      function() { location.reload(); }
    );
  });
});