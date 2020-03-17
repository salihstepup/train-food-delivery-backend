const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load Restaurant model
const Restaurant = require("../../models/Restaurant");

// @route Get api/restaurant/test
// @desc Test restaurant route
// @access public
router.get("/test", (req, res) => res.json({ msg: "Restaurant Works" }));

// Login
router.post("/login", (req, res) => {
  const number = req.body.number;
  const password = req.body.password;

  // Find user by number
  Restaurant.findOne({ number: req.body.number })
    .then(user => {
      // Check for user
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      // Check Password
      else if (password === user.password) {
        // User matched
        const payload = { id: user.id, number: user.number }; //Create JWT Payload
        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({ msg: "Incorrect Password" });
      }
    })
    .catch(err => res.status(404).json(err));
});

// Get current Restaurant
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.body);
    res.json({
      id: req.user.id,
      number: req.user.number,
      password: req.user.password
    });
  }
);

module.exports = router;
