require("dotenv").config();

const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/User");

const crypto = require("crypto");

passport.use(
  new FacebookStrategy(
    {
      clientID: `${process.env.FACEBOOK_APP_ID}`,
      clientSecret: `${process.env.FACEBOOK_APP_SECRET}`,
      callbackURL: `${process.env.HOST_SERVER}/api/auth/facebook/callback`,
      profileFields: ["id", "displayName", "emails"]
    },

    (accessToken, refreshToken, profile, done) => {
      User.findOne({ facebookID: profile.id })
        .then(user => {
          if (user) {
            done(null, user);
            return;
          }

          const randomPassword = crypto.randomBytes(20).toString("hex");

          User.create({
            facebookID: profile.id,
            password: randomPassword,
            passportProvider: "Facebook",
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
