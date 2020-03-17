const express = require("express");
const router = express.Router();
const passport = require("passport");

//Load Order model
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const User = require("../../models/User");

// Test
router.get("/test", (req, res) => {
  res.json({ msg: "Orders works" });
});

// Disply Orders
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Order.find({ restaurant: req.user.number })
      .populate("user", "name")
      .populate("cart", "total products")
      .then(order => {
        if (order.length === 0) {
          res.status(404).json("No orders yet");
        }
        res.json(order);
      })
      .catch(err => {
        res.json(err);
      });
  }
);

// Disply Order By Id
router.get(
  "/:orderId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.params.orderId;
    Order.find({ _id: id })
      .populate("user", "name")
      .populate("cart", "total products")
      .then(order => {
        if (order.length === 0) {
          res.status(404).json("No orders yet");
        }
        res.json(order);
      })
      .catch(err => {
        res.json(err);
      });
  }
);

// Delete Order By Id
router.delete(
  "/:orderId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.params.orderId;
    Order.remove({ _id: id })
      .then(order => {
        res.status(200).json(order);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
);

module.exports = router;
