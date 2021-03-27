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
    var activeUser = false
    if (req.user) { activeUser = true };
    res.render("pages/index", {
      activeUser
    });
  });

  app.get("/login", function (req, res) {
    res.render("pages/login", { activeUser: false });
  });

  app.get("/signup", function (req, res) {
    res.render("pages/signup", { activeUser: false });
  });

  app.get("/profile", isAuthenticated, async (req, res) => {
    var activeUser = false
    if (req.user) { activeUser = true };
    console.log(req.user);
    var rider = req.user.id;
    var qBonuses = await q.queryAllBonusItems();
    var qBikes = await q.queryAllBikes(rider);
    var qCompleted = await q.queryAllBonusesWithStatus(rider);
    console.log("==============")
    console.log(qCompleted);

    res.render("pages/profile", {
      activeUser,
      user: req.user,
      bonuses: qBonuses,
      bikes: qBikes,
      completed: qCompleted
    });
  });

  app.get("/2021", isAuthenticated, function (req, res) {
    var activeUser = false
    if (req.user) { activeUser = true };
    res.render("pages/2021", { activeUser });
  });

  app.get("/2020", isAuthenticated, function (req, res) {
  });

  app.get("/contact", isAuthenticated, function (req, res) {
  });

  app.get("/covid1000", isAuthenticated, function (req, res) {
  });

  app.get("/history", isAuthenticated, function (req, res) {
  });

  app.get("/submit", isAuthenticated, async (req, res) => {
    var activeUser = false
    if (req.user) { activeUser = true };
    var rider = req.user.id;
    var qBonuses = await q.queryAllBonusItems();
    var qBikes = await q.queryAllBikes(rider);

    res.render("pages/submit", {
      activeUser,
      user: req.user,
      bonuses: qBonuses,
      bikes: qBikes
    });
  });

  app.get("/review", isAuthenticated, isAdmin, async (req, res) => {
    var activeUser = false
    if (req.user) { activeUser = true };
    var qPendingSubmissionCount = await q.queryPendingSubmissionCount();
    var qHandledSubmissions = await q.queryHandledSubmissions(4);
    var userStatus = 0;
    if (req.user.isAdmin) { 
      userStatus = 2;
    } else if (req.user.id) {
      userStatus = 1;
    }
    console.log("====================");
    console.log(req.user);
    if (qPendingSubmissionCount > 0) {
      var qPendingSubmissions = await q.queryPendingSubmissions();
      var qPendingBonusDetail = await q.queryPendingBonusDetail(qPendingSubmissions[0].bonus_id);
      var qPendingRiderInfo = await q.queryPendingRiderInfo(qPendingSubmissions[0].user_id);
      var qPendingBikeInfo = await q.queryPendingBikeInfo(qPendingSubmissions[0].user_id);
      // var qUserRights = await q.queryUserRights(req.user.id);
      res.render("pages/review", {
        activeUser,
        user: req.user,
        pendingBonusCount: qPendingSubmissionCount,
        pendingBonuses: qPendingSubmissions,
        pendingRiderInfo: qPendingRiderInfo,
        pendingBikeInfo: qPendingBikeInfo,
        pendingBonusDetail: qPendingBonusDetail,
        handledSubmissions: qHandledSubmissions
      });
    } else {
      res.render("pages/review", {
        activeUser,
        user: req.user,
        pendingBonusCount: qPendingSubmissionCount,
        handledSubmissions: qHandledSubmissions
      });
    }
  });

  app.get("/live", async (req, res) => {
    var activeUser = false
    var qHandledSubmissions = await q.queryHandledSubmissions(1000);
    if (req.user) { 
      activeUser = true;
      res.render("pages/livefeed", {
        activeUser,
        user: req.user,
        handledSubmissions: qHandledSubmissions
      });
    } else {
      res.render("pages/livefeed", {
        activeUser,
        handledSubmissions: qHandledSubmissions
      });
    };
  })

  app.get("/stats", async (req, res) => {
    var activeUser = false;
    if (req.user) { activeUser = true };
    var qPendingSubmissionCount = await q.queryPendingSubmissionCount();
    console.log(qPendingSubmissionCount + " remaining submissions");

    if(activeUser) {
      res.render("pages/stats", {
        activeUser,
        user: req.user,
        pendingBonuses: qPendingSubmissionCount
      });
    } else {
      res.render("pages/stats", {
        activeUser,
        pendingBonuses: qPendingSubmissionCount
      });
    }
  });

  app.get("/admin", isAuthenticated, isAdmin, async (req, res) => {
    var activeUser = false
    if (req.user) { activeUser = true };
    var qBonuses = await q.queryAllBonusItems();
    var qRiders = await q.queryAllRiders();

    res.render("pages/admin", {
      activeUser,
      user: req.user,
      bonuses: qBonuses,
      riders: qRiders
    });
  });

  // If no matching route is found, return the 404 page
  app.get("*", isAuthenticated, function (req, res) {
    var activeUser = false
    if (req.user) { activeUser = true };
    res.render("pages/404", { activeUser });
  });
};