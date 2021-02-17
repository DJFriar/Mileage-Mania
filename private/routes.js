var path = require("path");
const db = require("../models");
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/isAuthenticated");

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

  // If no matching route is found, return the 404 page
  app.get("*", function (req, res) {
    res.render("pages/404");
  });
};