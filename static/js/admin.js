$(document).ready(() => {  
  // Handle Add Bonus Button
  $("#saveBonusButton").on("click", function() {
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
        location.reload();
      }
    );
  });

  // Handle Delete Bonus Button
  $(".deleteBonusButton").on("click", function() {
    var id = $(this).data("id");

    $.ajax("/api/bonus/" + id, {
      type: "DELETE"
    }).then(
      function() {
        location.reload();
      }
    );
  });
});