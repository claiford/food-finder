const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const Customer = require("../models/CustomerModel"); // Adjust the path as needed

// using email and password
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      console.log("email:", email)
      try {
        const customer = await Customer.findOne({ email });
        console.log("customer found: ", customer);

        if (!customer) {
          return done(null, false, {
            message: "Invalid email or password. Please try again.",
          });
        }

        const passwordMatch = await bcrypt.compare(password, customer.password);

        if (!passwordMatch) {
          return done(null, false, {
            message: "Invalid password or password. Please try again.",
          });
        }

        return done(null, customer);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((customer, done) => {
  done(null, customer.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const customer = await Customer.findById(id);
    console.log("customer deserialized: ", customer)
    done(null, customer);
  } catch (error) {
    done(error);
  }
});
module.exports = passport;