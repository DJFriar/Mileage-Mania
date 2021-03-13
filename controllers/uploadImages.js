const multer = require("multer");
const resizeImages = require("./resizeImage");
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

const uploadFiles = upload.array("images", 1); // limit to 1 image

const uploadImages = (req, res) => {
  console.log("uploadImages called");
  uploadFiles(req, res, err => {
    console.log("uploadFiles called");
    if (err) {
      return res.send(err);
    }
  });
};

module.exports = uploadImages