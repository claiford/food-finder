const router = require("express").Router();
const passport = require("passport");

const AuthController = require("../controllers/AuthController");

router.post("/customer/signup", AuthController.createCustomer);
router.post("/merchant/signup", AuthController.createMerchant);

// Authentication routes
router.post(
  "/auth/customer/login",
  passport.authenticate("local-customer"),
  (req, res) => {
    if (req.isAuthenticated()) {
      // Get the authenticated customer
      const customer = req.user;
      const userData = {
        _id: customer._id,
        name: customer.name,
      };
      // Set a cookie with user information
      res.cookie("userData", JSON.stringify(userData), {
        maxAge: 30 * 60 * 1000,
        httpOnly: true,
      });
      res.json({ authenticated: true, userData });
    } else {
      res
        .status(401)
        .json({ authenticated: false, message: "Authentication failed" });
    }
  }
);

router.post(
  "/auth/merchant/login",
  passport.authenticate("local-merchant"),
  (req, res) => {
    if (req.isAuthenticated()) {
      // Get the authenticated merchant
      const merchant = req.user;
      const merchantData = {
        _id: merchant._id,
        name: merchant.name,
      };
      // Set a cookie with user information
      res.cookie("merchantData", JSON.stringify(merchantData), {
        maxAge: 30 * 60 * 1000,
        httpOnly: true,
      });
      res.json({ authenticated: true, merchantData });
    } else {
      res
        .status(401)
        .json({ authenticated: false, message: "Authentication failed" });
    }
  }
);

module.exports = router;
