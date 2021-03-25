$(document).ready(function () {
  let imagesPreview = function (input, placeToInsertImagePreview) {
    if (input.files) {
      let reader = new FileReader();
      reader.onload = function (event) {
        $(".mileSubBtnImg")
          .attr("src", event.target.result)
      };
      reader.readAsDataURL(input.files[0]);
    }
  };
  $("#input-images").on("change", function () {
    imagesPreview(this, "label#mileSubLabel");
  });
});
