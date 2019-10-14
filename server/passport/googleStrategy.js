require("dotenv").config();

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

// Crypto
const crypto = require("crypto");

passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.GOOGLE_ID}`,
      clientSecret: `${process.env.GOOGLE_SECRET}`,
      callbackURL: `${process.env.HOST_SERVER}/api/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then(user => {
          if (user) {
            done(null, user);
            return;
          }

          const randomPassword = crypto.randomBytes(20).toString("hex");

          User.create({
            googleID: profile.id,
            password: randomPassword,
            passportProvider: "Google",
            username: profile.displayName,
            email: profile.emails[0].value,
            status: "Active"
          })
            .then(newUser => {
              done(null, newUser);
            })
            .catch(err => done(err)); // closes User.create()
        })
        .catch(err => done(err)); // closes User.findOne()
    }
  )
);
