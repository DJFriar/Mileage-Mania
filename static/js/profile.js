$(document).ready(() => {
  // Handle the Delete Wishlist button.
  $(".btnDeleteWishlist").on("click", function() {
    var id = $(this).data("id");
    $.ajax("/api/delWishlistPark/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted wishlist:", id);
        // Reload the page to get the updated list
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