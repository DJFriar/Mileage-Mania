$(document).ready(() => {
  console.log("Document ready");
  // Handle Add Bonus Button
  $("#saveBonusButton").on("click", function(event) {
    var newBonus = {
      BonusCode: $("#BonusCode").val().trim().toUpperCase(),
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
        console.log("Entry added to the Bonus List.");
        location.reload(true);
      }
    );
  });

});