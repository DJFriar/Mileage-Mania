// Requiring our models and passport as we've configured it
const db = require("../models");
const uploadSubmission = require("../controllers/uploadSubmission");
const passport = require("../config/passport");
const multer = require('multer');
const isAuthenticated = require("../config/isAuthenticated");
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
    db.user.create({
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
    res.json({
      email: req.user.Email,
      id: req.user.id
    });
  });

  // Create a Bike
  app.post("/api/bike", isAuthenticated, (req, res) => {
    db.bike.create({
      user_id: req.user.id,
      BikeName: req.body.BikeName,
      Year: req.body.Year,
      Make: req.body.Make,
      Model: req.body.Model,
    }).then(() => {
      res.status(202).send();
    });
  });

  // Accept the image the user uploaded, resize it and save it.
  app.post('/submit-bonus',
    uploadSubmission.uploadImages,
    uploadSubmission.resizeImages,
    uploadSubmission.getResult,
    function (req, res) {
      //Write data to the respective DB
      if (req.body.BonusType === "Odo") {
        db.bonusLog.create({
          bike_id: req.body.bike_id,
          user_id: req.user.id,
          bonus_id: null,
          odoValue: req.body.odoValue,
          imageName: req.body.images[0],
          iStatus: 0 // 0 = Pending Approval
        })
      }
      if (req.body.BonusType === "GT") {
        db.bonusLog.create({
          bike_id: req.body.bike_id,
          user_id: req.user.id,
          bonus_id: req.body.bonus_id,
          odoValue: null,
          imageName: req.body.images[0],
          iStatus: 0 // 0 = Pending Approval
        })
      }
      res.redirect("/submit");
    }
  );

  // Update submissions
  app.put("/handle-submission", function (req, res) {
    db.bonusLog.update({ iStatus: req.body.iStatus }, {
      where: { id: req.body.submissionID }
    });
    res.send("success");
  })

  // Handle Profile Updates
  app.put("/profile", function (req, res) {
    db.user.update({
      FirstName: req.body.FirstName,
      LastName: req.res.LastName,
      UserName: req.body.UserName,
      Email: req.body.Email
    }, {
      where: { id: req.body.userID }
    });
    res.redirect("/profile");
  })

  // Get all bikes
  app.get("/api/bikes", function (req, res) {
    db.bike.findAll({}).then(function (dbPost) {
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
};
