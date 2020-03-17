const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Delivery model
const Delivery = require("../../models/Delivery");

// test
router.get("/test", (req, res) => res.json({ msg: "Delivery Works" }));

// Add delivery boy
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newDelivery = {};

    (newDelivery.restaurant = req.user.id),
      (newDelivery.order = req.body.order),
      (newDelivery.name = req.body.name),
      (newDelivery.phone = req.body.phone),
      (newDelivery.time = req.body.time);

    Delivery.find({ restaurant: req.user.id }).then(delivery => {
      new Delivery(newDelivery).save().then(delivery => res.json(delivery));
    });
  }
);

// Get delivery boy
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Delivery.find()
      .populate("order")
      .then(delivery => {
        if (delivery.length == 0) {
          res.status(404).json({ msg: "Delivery boys not found" });
        }
        res.json(delivery);
      })
      .catch(err => res.status(404).json(err));
  }
);

// Find delivery boy by id
router.get(
  "/:deliveryBoyId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.params.deliveryBoyId;
    Delivery.findById(id)
      .then(delivery => {
        res.status(200).json(delivery);
      })
      .catch(err => res.status(500).json(err));
  }
);

module.exports = router;
