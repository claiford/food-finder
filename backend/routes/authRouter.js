const router = require("express").Router();
const AuthController = require("../controllers/AuthController");

router.post("/customer/signup", AuthController.createCustomer);
router.post("/merchant/signup", AuthController.createMerchant);
router.post("/customer/login", AuthController.customerLogin);
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
