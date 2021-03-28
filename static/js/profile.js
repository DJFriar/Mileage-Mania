$(document).ready(() => {
  // Handle Add Bike Button.
  $("#addBikeButton").on("click", function() {
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
  $(".btnDeleteVisited").on("click", function() {
    var id = $(this).data("id");
    $.ajax("/api/delVisitedPark/" + id, {
      type: "DELETE"
    }).then(
      function() { location.reload(); }
    );
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
    console.log(userID);
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