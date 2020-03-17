const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.filename);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimeType === "image/jpeg" || file.mimeType === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Load Products model
const Products = require("../../models/Product");

// Tesst router
router.get("/test", (req, res) => {
  res.json({ msg: "Products works" });
});

// Add products
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  upload.single("productImage"),
  (req, res) => {
    const newProduct = {};
    console.log(req.file);
    (newProduct.restaurant = req.user.id),
      (newProduct.number = req.user.number),
      (newProduct.name = req.body.name),
      (newProduct.price = req.body.price),
      (newProduct.category = req.body.category),
      (newProduct.description = req.body.description),
      //   (newProduct.productImage = req.file.productImage),
      Products.find({ restaurant: req.user.id }).then(product => {
        new Products(newProduct).save().then(product => res.json(product));
      });
  }
);

// Display products
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Products.find({ restaurant: req.user.id })
      .then(pdt => {
        if (pdt.length == 0) {
          return res.status(404).json({ msg: "No products found" });
        }
        res.json(pdt);
      })
      .catch(err => res.status(404).json(err));
  }
);

// Find product by id
router.get(
  "/:productId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.params.productId;
    Products.findById(id)
      .then(pdt => {
        res.status(200).json(pdt);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
);

// Delete product
router.delete(
  "/:productId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.params.productId;
    Products.remove({ _id: id })
      .then(pdt => {
        res.status(200).json(pdt);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
);

module.exports = router;
