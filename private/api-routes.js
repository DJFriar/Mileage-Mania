// Requiring our models and passport as we've configured it
const db = require("../models");
const uploadSubmission = require("../controllers/uploadSubmission");
const passport = require("../config/passport");
const multer = require('multer');
const upload = multer({ dest: '../static/uploads' });

module.exports = function (app) {
  // Create a Bonus
  app.post("/api/bonus", (req, res) => {
    db.bonusItem.create({
      BonusCode: req.body.BonusCode,
      BonusName: req.body.BonusName,
      BonusDescription: req.body.BonusDescription,
      BonusRequirements: req.body.BonusRequirements,
      Value: req.body.Value,
      maxAllowed: req.body.maxAllowed,
      RallyYear: 2021,
      hasExtraMile: false,
      ExtraMileRequirements: "",
      ExtraMileValue: 0
    }).then(() => {
      res.status(202).send();
    });
  });

  // Delete a Bonus
  app.delete("/api/bonus/:id", (req, res) => {
    const id = req.params.id;
    console.log("Removing " + id + " from bonus list");
    db.bonusItem.destroy({
      where: {
        id: id
      }
    }).then(() => {
      res.status(202).send();
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      UserName: req.body.UserName,
      Email: req.body.Email,
      Password: req.body.Password
    })
      .then(() => {
        console.log("User Created Successfully");
        res.status(202).send();
      })
      .catch(err => {
        console.log("Signup API Error Encountered");
        res.status(401).json(err);
      });
  });

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the profile page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    console.log(req);
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.Email,
      id: req.user.id
    });
  });






  // Get all users
  app.get("/api/riders", function (req, res) {
    db.User.all(function (data) {
      const hbsObject = {
        users: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });

  // Get all bikes
  app.get("/api/bikes", function (req, res) {
    db.Bike.findAll({}).then(function (dbPost) {
      res.json(dbPost);
    });
  });



  

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // Accept the image the user uploaded, resize it and save it.
  app.post('/image-upload', uploadSubmission.uploadImages, uploadSubmission.resizeImages, uploadSubmission.getResult, function (req, res) {
  });

  // Get all bonuses
  app.get("/api/bonus", function(req, res) {
    db.Post.all(function(data) {
      const dataObject = {
        bonuses: data
      };
      console.log(dataObject);
      res.render("index", dataObject);
    });
  });

  app.put("/api/addWishlistPark/:parkid", (req, res) => {
    const parkCode = req.params.parkid;
    console.log("Adding " + parkCode + " to user wishlist");
    db.WishlistPark.create({
      userID: req.user.id,
      parkID: parkCode
    }).then(() => {
      res.status(202).send();
    });
  });

  app.put("/api/addVisitedPark/:parkid", (req, res) => {
    const parkCode = req.params.parkid;
    console.log("Adding " + parkCode + " to user visited list");
    db.VisitedPark.create({
      userID: req.user.id,
      parkID: parkCode
    }).then(() => {
      res.status(202).send();
    });
  });

  app.delete("/api/delVisitedPark/:parkid", (req, res) => {
    const id = req.params.parkid;
    console.log("Removing " + id + " from visited list");
    db.VisitedPark.destroy({
      where: {
        id: id
      }
    }).then(() => {
      res.status(202).send();
    });
  });
};
