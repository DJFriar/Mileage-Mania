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
      Value: parseInt($("#Value").val(),10),
      maxAllowed: parseInt($("#maxAllowed").val(),10)
    };

    $.ajax("/api/bonus", {
      type: "POST",
      data: newBonus
    }).then(
      function() {
        console.log(BonusCode + "Entry added to the Bonus List.");
      }
    );
  });

});