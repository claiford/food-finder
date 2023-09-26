
const router = require("express").Router();
const AuthController = require("../controllers/AuthController");
// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;

router.post("/customer/signup", AuthController.createCustomer);
router.post("/merchant/signup", AuthController.createMerchant);

// IN PROGRESS: TESTING AUTH USING PASSPORTJS
// router.post('/customer/login', passport.authenticate('local'), (req, res) => {
//   // Successful authentication
//   res.status(200).json({
//     message: 'Login successful',
//     customer: {
//       id: req.user._id,
//       email: req.user.email,
//     },
//   });
// });

router.post("/customer/login", AuthController.customerLogin);
router.post("/merchant/login", AuthController.merchantLogin);

// TODO: NAVBAR FOR LOGOUT BTN
// router.get("/logout", AuthController.Logout)

// Profile route
router.get("/customer/home", (req, res) => {
  // Check if the user is authenticated based on the session
  if (req.session.existingUser) {
    // Customer is authenticated, serve the profile data
    const customer = req.session.existingUser;
    res.json({ authenticated: true, message: `Welcome, ${customer.name}!` });
  } else {
    // User is not authenticated, send an unauthorized response
    res.status(401).json({ authenticated: false, message: "Unauthorized" });
  }
});

module.exports = router;
