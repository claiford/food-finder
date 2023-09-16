const router = require("express").Router();
const { CustomerSignUp } = require("../controllers/AuthController");
const { MerchantSignUp } = require("../controllers/AuthController");

// router.get("/", function(req, res) {
//     res.send("login page")
// })
router.post("/customer/signup", CustomerSignUp);
router.post("/merchant/signup", MerchantSignUp);
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
