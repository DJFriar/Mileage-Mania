$(document).ready(function () {
  let handleOdoPhoto = function (input, placeToInsertImagePreview) {
    if (input.files) {
      let reader = new FileReader();
      reader.onload = function (event) {
        $(".mileSubBtnImg")
          .attr("src", event.target.result)
      };
      reader.readAsDataURL(input.files[0]);
    }
  };
  $("#input-odoImage").on("change", function () {
    handleOdoPhoto(this, "label#mileSubLabel");
  });
  
  let handleGTPhoto = function (input, placeToInsertImagePreview) {
    if (input.files) {
      let reader = new FileReader();
      reader.onload = function (event) {
        $(".gtSubBtnImg")
          .attr("src", event.target.result)
      };
      reader.readAsDataURL(input.files[0]);
    }
  };
  $("#input-gtImage").on("change", function () {
    handleGTPhoto(this, "label#gtSubLabel");
  });

  $("#Odo").on("change",function(event) {
    event.preventDefault();
    $(".odoField").removeClass("hide-me");
    $(".gtField").addClass("hide-me");
    $(".bonusField").removeClass("hide-me");
  })

  $("#GT").on("change",function(event) {
    event.preventDefault();
    $(".gtField").removeClass("hide-me");
    $(".odoField").addClass("hide-me");
    $(".bonusField").removeClass("hide-me");
  })
});
