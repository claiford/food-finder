const router = require("express").Router();
const AuthController = require("../controllers/AuthController");

// router.get("/", function(req, res) {
//     res.send("login page")
// })
router.post("/customer/signup", AuthController.createCustomer);
router.post("/merchant/signup", AuthController.createMerchant);
// router.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/profile",
//     failureRedirect: "/",
//     failureFlash: true,
//   })
// );
// router.get("/profile", isAuthenticated, (req, res) => {
//   res.send(`Welcome, ${req.user.username}`);
// });

module.exports = router;
