
const router = require("express").Router();
const AuthController = require("../controllers/AuthController");
const passport = require("passport");
// const local = require("./strategy/local")

router.post("/customer/signup", AuthController.createCustomer);
router.post("/merchant/signup", AuthController.createMerchant);

// IN PROGRESS: TESTING AUTH USING PASSPORTJS
router.post('/auth/customer/login', passport.authenticate('local', {
  successRedirect: "/customer/home",
  failureRedirect: "/"
}), (req, res) => {
  if(req.isAuthenticated()) {
    console.log("INSIDE isAuthenticated block")
    // get the authenticated customer
    const customer = req.user;
    console.log("Authenticated customer: ", customer)
    // res.redirect("/customer/home")
  } else {
    console.log("ERROR COMING...")
    res.status(401).json({ authenticated: false, message: "Authentication failed"})
  }
})


// router.post("/customer/login", AuthController.customerLogin);
router.post("/merchant/login", AuthController.merchantLogin);

// TODO: NAVBAR FOR LOGOUT BTN
// router.get("/logout", AuthController.Logout)

// Profile route
// router.get("/customer/home", (req, res) => {
//   // Check if the user is authenticated based on the session
//   if (req.session.existingUser) {
//     // Customer is authenticated, serve the profile data
//     const customer = req.session.existingUser;
//     res.json({ authenticated: true, message: `Welcome, ${customer.name}!` });
//   } else {
//     // User is not authenticated, send an unauthorized response
//     res.status(401).json({ authenticated: false, message: "Unauthorized" });
//   }
// });

module.exports = router;
