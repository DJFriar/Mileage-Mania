$(document).ready(() => {
  console.log("Document ready");
  // Handle Add Bonus Button
  $("#saveBonusButton").on("click", function(event) {
    event.preventDefault();
    console.log("Save Bonus Button was clicked");
    var newBonus = {
      BonusCode: $("#BonusCode").val().trim(),
      BonusName: $("#BonusName").val().trim(),
      BonusDescription: $("#BonusDescription").val().trim(),
      BonusRequirements: $("#BonusRequirements").val().trim(),
      Value: $("#Value").val().trim(),
      maxAllowed: $("#maxAllowed").val().trim()
    };

    $.ajax("/api/bonus/", {
      type: "PUT",
      data: newBonus
    }).then(
      function() {
        console.log(id + " was added to the Bonus List.");
      }
    );
  });

});