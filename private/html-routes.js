var path = require("path");
const db = require("../models");
const q = require("../private/queries");
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/isAuthenticated");
const isAdmin = require("../config/isAdmin");

module.exports = function (app) {
  // ===============================================================================
  // HTML ROUTES
  // ===============================================================================
  app.get("/", function (req, res) {
    res.render("pages/index");
  });

  app.get("/login", function (req, res) {
    res.render("pages/login");
  });

  app.get("/signup", function (req, res) {
    res.render("pages/signup");
  });

  app.get("/profile", isAuthenticated, async(req, res) => {
    console.log(req.user);
    var rider = req.user.id;
    var qBonuses = await q.queryAllBonusItems();
    var qBikes = await q.queryAllBikes(rider);
    
    res.render("pages/profile", {
      user: req.user,
      bonuses: qBonuses,
      bikes: qBikes
    });
  });

  app.get("/2021", function (req, res) {
    res.render("pages/2021");
  });

  app.get("/2020", function (req, res) {
    res.render("pages/2020");
  });

  app.get("/contact", function (req, res) {
    res.render("pages/contact");
  });

  app.get("/covid1000", function (req, res) {
    res.render("pages/covid1000");
  });

  app.get("/history", function (req, res) {
    res.render("pages/history");
  });

  app.get("/submit", isAuthenticated, async(req, res) => {
    var rider = req.user.id;
    var qBonuses = await q.queryAllBonusItems();
    var qBikes = await q.queryAllBikes(rider);

    res.render("pages/submit", {
      user: req.user,
      bonuses: qBonuses,
      bikes: qBikes
    });
  });

  app.get("/review", isAuthenticated, isAdmin, async(req, res) => {
    var qPendingSubmissionCount = await q.queryPendingSubmissionCount();
    var qPendingSubmissions = await q.queryPendingSubmissions();

    res.render("pages/review", {
      pendingBonusCount: qPendingSubmissionCount,
      pendingBonuses: qPendingSubmissions
    });
  });

  app.get("/stats", async(req, res) => {
    var qPendingSubmissionCount = await q.queryPendingSubmissionCount();
    console.log(qPendingSubmissionCount + " remaining submissions");
    
    res.render("pages/stats", {
      pendingBonuses: qPendingSubmissionCount
    });
  });

  app.get("/admin", isAuthenticated, isAdmin, async (req, res) => {
    var qBonuses = await q.queryAllBonusItems();
    var qRiders = await q.queryAllRiders();

    res.render("pages/admin", {
      bonuses: qBonuses,
      riders: qRiders
    });
  });

  // If no matching route is found, return the 404 page
  app.get("*", function (req, res) {
    res.render("pages/404");
  });
};