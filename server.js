require("dotenv").config();

var express = require("express");
var path = require("path");

// ==============================================================================
// CONFIGURATION
// ==============================================================================
var app = express();
var PORT = process.env.PORT || 3500;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("static"));
app.use(express.static("private"));

// ================================================================================
// ROUTES
// ================================================================================
require("./private/routes")(app);

// =============================================================================
// LISTENER
// =============================================================================
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});