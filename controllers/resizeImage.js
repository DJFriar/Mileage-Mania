const sharp = require("sharp");

const resizeImages = async (req, res) => {
  console.log("resizeImages called");
  // if (!req.files) return;

  req.body.images = [];
  await Promise.all(
    req.files.map(async file => {
      const filename = file.originalname.replace(/\..+$/, "");
      const newFilename = `bezkoder-${filename}-${Date.now()}.jpeg`;
      console.log(newFilename);
      await sharp(file.buffer)
        .resize(640, 320)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        // .toFile(`static/uploads/${newFilename}`);
        .toFile(`upload/${newFilename}`);

      req.body.images.push(newFilename);
    })
  );

};

module.exports = resizeImages