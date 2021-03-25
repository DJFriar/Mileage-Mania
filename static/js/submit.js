//
// https://bezkoder.com/node-js-upload-resize-multiple-images/
//

$(document).ready(function () {
  let imagesPreview = function (input, placeToInsertImagePreview) {
    if (input.files) {
      let reader = new FileReader();
      reader.onload = function (event) {
        $($.parseHTML("<img>"))
          .attr("src", event.target.result)
          .appendTo(placeToInsertImagePreview);
      };
      reader.readAsDataURL(input.files[0]);
    }
  };
  $("#input-images").on("change", function () {
    imagesPreview(this, "div.preview-images");
  });
});

//
// http://talkerscode.com/webtricks/preview-image-before-upload-using-javascript.php
//

// function preview_image(event) {
//   var reader = new FileReader();
//   reader.onload = function () {
//     var output = document.getElementById('output_image');
//     output.src = reader.result;
//   }
//   reader.readAsDataURL(event.target.files[0]);
// }

//
// https://bezkoder.com/node-js-upload-image-mysql/
//

// const fs = require("fs");
// const db = require("../models");
// const Image = db.images;

// const rootPath = __basedir;
// console.log(rootPath);

// const uploadFiles = async (req, res) => {
//   try {
//     console.log(req.file);

//     if (req.file == undefined) {
//       return res.send(`You must select a file.`);
//     }

//     Image.create({
//       type: req.file.mimetype,
//       name: req.file.originalname,
//       data: fs.readFileSync(
//         __basedir + "/resources/static/assets/uploads/" + req.file.filename
//       ),
//     }).then((image) => {
//       fs.writeFileSync(
//         __basedir + "/resources/static/assets/tmp/" + image.name,
//         image.data
//       );

//       return res.send(`File has been uploaded.`);
//     });
//   } catch (error) {
//     console.log(error);
//     return res.send(`Error when trying upload images: ${error}`);
//   }
// };

// module.exports = {
//   uploadFiles,
// };