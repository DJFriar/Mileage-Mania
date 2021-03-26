module.exports = function(req, res, next) {
  // console.log("isAdmin: " + req.user.isAdmin);
  console.log("==================");
  console.log(req.user);
  console.log("==================");
  if (req.user.isAdmin) {
    return next();
  }

  // If the user is not an admin, redirect them to the homepage.
  return res.redirect("/");
}