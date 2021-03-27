// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function(req, res, next) {
  source = req.route.path;
  publicPages = ["/", "/login", "/signup", "/history", "/2020", "/2021", "/covid1000", "/contact"];

  // Logged in, private page
  if (req.user && !publicPages.includes(source)) {
    return next();
  }

  // logged in, public page
  if (req.user && publicPages.includes(source)) {
    return res.render("pages" + source, { activeUser: true, user: req.user });
  }

  // not logged in, public page
  if (!req.user && publicPages.includes(source)) {
    return res.render("pages" + source, { activeUser: false });
  }

  // not logged in, private page
  if (!req.user && !publicPages.includes(source)) {
    return res.redirect("/login");
  }

  // everything failed
  return res.redirect("/");
};
