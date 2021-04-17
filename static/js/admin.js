$(document).ready(() => {  
  // Handle Add Bonus Button
  $("#addBonusButton").on("click", function(e) {
    e.preventDefault();
    $(".addBonusSection").removeClass("hide-me");
    $(".addBonusBtnDiv").addClass("hide-me");
  })

  // Handle Save Bonus Button
  $("#saveNewBonusButton").on("click", function() {
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

  // Handle Edit Bonus Button
  $(".editBonusButton").on("click", function() {
    var id = $(this).data("uid");
    $(".modal").css("display","block");
    $.ajax("/api/bonus/" + id, {
      type: "GET",
    }).then(
      function(res) {
        $("#EditBonusID").val(res.id);
        $("#EditBonusCode").val(res.BonusCode);
        $("#EditBonusName").val(res.BonusName);
        $("#EditBonusDescription").val(res.BonusDescription);
        $("#EditBonusRequirements").val(res.BonusRequirements);
        $("#EditValue").val(res.Value);
        $("#EditMaxAllowed").val(res.maxAllowed);
      }
    )
  })

  // Handle Edit Dialog Close Button
  $(".close").on("click", function() {
    $(".modal").css("display","none");
  })

  // Handle Edit Dialog Cancel Button
  $("#cancelButton").on("click", function() {
    $(".modal").css("display","none");
  })

  // Handle Delete Bonus Button
  $(".deleteBonusButton").on("click", function() {
    var id = $(this).data("uid");

    $.ajax("/api/bonus/" + id, {
      type: "DELETE"
    }).then(
      function() {
        location.reload();
      }
    );
  });

  // Handle Save Changes Button
  $("#saveBonusChangesButton").on("click", function() {
    var id = $("#EditBonusID").val();
    var updateBonus = {
      bonus_id: $("#EditBonusID").val(),
      BonusCode: $("#EditBonusCode").val().trim().toUpperCase(),
      BonusName: $("#EditBonusName").val().trim(),
      BonusDescription: $("#EditBonusDescription").val().trim(),
      BonusRequirements: $("#EditBonusRequirements").val().trim(),
      Value: parseInt($("#EditValue").val(),10),
      maxAllowed: parseInt($("#EditMaxAllowed").val(),10)
    };
    $.ajax("/api/bonus/" + id, {
      type: "put",
      data: updateBonus
    }).then(
      function() {
        location.reload();
      }
    );
  });
});