const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const restaurants = require("./routes/api/restaurants");
const products = require("./routes/api/products");
const delivery = require("./routes/api/delivery");
const orders = require("./routes/api/orders");

const app = express();

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

// Use Routes
app.use("/api/restaurants", restaurants);
app.use("/api/products", products);
app.use("/api/delivery", delivery);
app.use("/api/orders", orders);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
