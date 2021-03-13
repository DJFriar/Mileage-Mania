const getResult = async (req, res) => {
  console.log("===============================")
  console.log(res)
  console.log("===============================")
  if (req.body.images.length <= 0) {
    console.log("You must select at least 1 image.")
    // return res.send(`You must select at least 1 image.`);
  }

  const images = req.body.images
    .map(image => "" + image + "")
    .join("");

  return res.send(`Images were uploaded:${images}`);
};

module.exports = getResult