var path = require("path");
const db = require("../models");
const q = require("../private/queries");
const moment = require("moment");
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/isAuthenticated");
const isAdmin = require("../config/isAdmin");

module.exports = function (app) {
  // ===============================================================================
  // HTML ROUTES
  // ===============================================================================


  app.get("/profile", isAuthenticated, async (req, res) => {
    var activeUser = false
    if (req.user) { activeUser = true };
    var rider = req.user.id;
    var qBonuses = await q.queryAllBonusItems();
    var qBikes = await q.queryAllBikes(rider);
    var qCompleted = await q.queryCompletedIDsByRider(rider);
    var qMileageRidden = await q.queryMileageRiddenByRider(rider);
    var qPointsEarned = await q.queryPointsEarnedByRider(rider);
    for (i = 0; i < qBonuses.length; i++){
      if (qCompleted.indexOf(qBonuses[i].id) > -1 ){
        qBonuses[i].completed = "completedBonus";
      }
    }

    res.render("pages/profile", {
      activeUser,
      user: req.user,
      bonuses: qBonuses,
      bikes: qBikes,
      completed: qCompleted,
      mileageRidden: qMileageRidden,
      pointsEarned: qPointsEarned
    });
  });

  app.get("/submit", isAuthenticated, async (req, res) => {
    var activeUser = false
    if (req.user) { activeUser = true };
    var rider = req.user.id;
    var qBonuses = await q.queryAllBonusItems();
    var qBikes = await q.queryAllBikes(rider);
    var qSubmissionHistory = await q.querySubmissionsByRider(rider);
    res.render("pages/submit", {
      activeUser,
      user: req.user,
      bonuses: qBonuses,
      bikes: qBikes,
      history: qSubmissionHistory,
      moment: moment
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
    console.log("======== PENDING BONUSES =========");
    console.log(qPendingSubmissionCount);
    if (qPendingSubmissionCount > 0) {
      var qPendingSubmissions = await q.queryPendingSubmissions();
      var qPendingBonusDetail = await q.queryPendingBonusDetail(qPendingSubmissions[0].bonus_id);
      var qPendingRiderInfo = await q.queryPendingRiderInfo(qPendingSubmissions[0].user_id);
      var qPendingBikeInfo = await q.queryPendingBikeInfo(qPendingSubmissions[0].user_id);
      res.render("pages/review", {
        activeUser,
        user: req.user,
        pendingBonusCount: qPendingSubmissionCount,
        pendingBonuses: qPendingSubmissions,
        pendingRiderInfo: qPendingRiderInfo,
        pendingBikeInfo: qPendingBikeInfo,
        pendingBonusDetail: qPendingBonusDetail,
        handledSubmissions: qHandledSubmissions,
        moment: moment
      });
    } else {
      res.render("pages/review", {
        activeUser,
        user: req.user,
        pendingBonusCount: qPendingSubmissionCount,
        handledSubmissions: qHandledSubmissions,
        moment: moment
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
        handledSubmissions: qHandledSubmissions,
        moment: moment
      });
    } else {
      res.render("pages/livefeed", {
        activeUser,
        handledSubmissions: qHandledSubmissions,
        moment: moment
      });
    };
  })

  app.get("/stats", async (req, res) => {
    var activeUser = false;
    if (req.user) { activeUser = true };
    var qPendingSubmissionCount = await q.queryPendingSubmissionCount();

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

  app.get("/", isAuthenticated, async (req, res) => {
    var activeUser = false
    var qHandledSubmissions = await q.queryHandledSubmissions(8);
    if (req.user) { 
      activeUser = true;
      res.render("pages/index", {
        activeUser,
        user: req.user,
        handledSubmissions: qHandledSubmissions,
        moment: moment
      });
    } else {
      res.render("pages/index", {
        activeUser,
        handledSubmissions: qHandledSubmissions,
        moment: moment
      });
    };
  });

  app.get("/login", isAuthenticated, function (req, res) {
  });

  app.get("/signup", isAuthenticated, function (req, res) {
  });

  app.get("/2021", isAuthenticated, function (req, res) {
  });

  app.get("/2020", isAuthenticated, function (req, res) {
  });

  app.get("/contact", isAuthenticated, function (req, res) {
  });

  app.get("/covid1000", isAuthenticated, function (req, res) {
  });

  app.get("/history", isAuthenticated, function (req, res) {
  });

  // If no matching route is found, return the 404 page
  app.get("*", isAuthenticated, function (req, res) {
    var activeUser = false
    if (req.user) { activeUser = true };
    res.render("pages/404", { activeUser });
  });
};