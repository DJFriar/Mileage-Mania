const multer = require("multer");
const sharp = require("sharp");
const moment = require("moment");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  console.log("multerFilter called");
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

const uploadFiles = upload.array("image-to-submit", 1); // limit to 1 image

const uploadImages = (req, res, next) => {
  console.log("uploadImages called");
  uploadFiles(req, res, err => {
    console.log("uploadFiles called");
    if (err) {
      return res.send(err);
    }
    next();
  });
};

const resizeImages = async (req, res, next) => {
  console.log("resizeImages called");
  if (!req.files) return;

  req.body.images = [];
  await Promise.all(
    req.files.map(async file => {
      const riderNumber = "F16"; // TODO: Replace with proper logic
      const bonusID = "BFFL"; // TODO: Replace with proper logic
      const currentTimestamp = moment().unix(); // Appends the unix timestamp to the file to avoid overwriting.
      const newFilename = `${riderNumber}-${bonusID}-${currentTimestamp}.jpg`;

      await sharp(file.buffer)
        .resize(800, 600)
        .position("left top")
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`static/uploads/${newFilename}`);

      req.body.images.push(newFilename);
    })
  );
  next();
};

const getResult = async (req, res) => {
  if (req.body.images.length <= 0) {
    return res.send(`You must select at least 1 image.`);
  }

  const images = req.body.images
    .map(image => "" + image + "")
    .join("");

  // return res.send(`Images were uploaded:${images}`);
  res.render("pages/submit");
};

module.exports = {
  uploadImages: uploadImages,
  resizeImages: resizeImages,
  getResult: getResult
};