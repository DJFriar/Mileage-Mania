//
// https://bezkoder.com/node-js-upload-image-mysql/#Define_routes
//

const fs = require("fs");

const db = require("../models");
const Image = db.images;

const uploadImage = async (req, res) => {
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }

    fs.writeFileSync(
      "../static/uploads" + req.file.originalname,
      image.data
    );

    // Image.create({
    //   type: req.file.mimetype,
    //   name: req.file.originalname,
    //   data: fs.readFileSync(
    //     __basedir + "/static/uploads/" + req.file.filename
    //   ),
    // }).then((image) => {
    //   fs.writeFileSync(
    //     __basedir + "/static/tmp/" + image.name,
    //     image.data
    //   );
    //   return res.send(`File has been uploaded.`);
    // });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

module.exports = {
  uploadImage,
};