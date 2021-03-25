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
      function() {
        console.log("Entry added to the bike list");
        location.reload();
      }
    );
  });

  // Handle the Delete Visited button.
  $(".btnDeleteVisited").on("click", function() {
    var id = $(this).data("id");
    $.ajax("/api/delVisitedPark/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted visited:", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});