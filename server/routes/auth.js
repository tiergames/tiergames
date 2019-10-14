require("dotenv").config()
const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

const transporter = require("../configs/nodemailer/nodemailer.config");
const confirmAccountEmailTemplate = require("../configs/nodemailer/confirm-account.template");
const forgotPasswordEmailTemplate = require("../configs/nodemailer/forgot-password.template");

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const crypto = require("crypto");

const login = (req, user) => {
  return new Promise((resolve, reject) => {
    req.login(user, err => {
      if (err) {
        reject(new Error("Something went wrong"));
      } else {
        resolve(user);
      }
    });
  });
};

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) next(new Error("Something went wrong"));
    if (!theUser) next(failureDetails);

    // If the loggin is OK, return the user and logged in
    login(req, theUser).then(() => res.status(200).json(req.user));
  })(req, res, next);
});

router.post("/signup", (req, res, next) => {
  // TODO: Create username based on email + random bytes
  // TODO: Add a name field to Model so we can store it in case we need it
  // TODO: Email needs to be unique (if not forgot password and other may not work well)
  const { username, email, password } = req.body;

  if (!username || !password || !email) {
    res.json({ message: "Please fill all the fields" });
    return;
  }

  User.findOne({ username }).then(user => {
    if (user) {
      res.status(500).json({ message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const confirmationToken = crypto.randomBytes(20).toString("hex");

    User.create({
      username,
      email,
      password: hashedPassword,
      confirmationToken: confirmationToken
    })
      .then(userInfo => {
        transporter
          .sendMail({
            from: `Tier Games`,
            to: userInfo.email,
            subject: "Confirm your E-mail to activate your account",
            html: confirmAccountEmailTemplate.template(
              confirmationToken,
              userInfo
            )
          })
          .then(emailSent => {
            res.json(userInfo);
          })
          .catch(err => {
            res.json({ message: "Something went wrong", err: err.message });
          });
      })
      .catch(err => {
        res.json({ message: "Something went wrong", err: err.message });
      });
  });
});

router.get("/currentuser", (req, res, next) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(404).json({ message: "User not found / logged in" });
  }
});

router.post("/confirm/:confirmationToken", (req, res, next) => {
  const { confirmationToken } = req.params;

  User.findOne({ confirmationToken: confirmationToken })
    .then(user => {
      if (!user) {
        res.status(404).json({
          status: "CONFIRMATION_USER_NOT_FOUND",
          message: `User not found with confirmation token: ${confirmationToken}`
        });
        return;
      }

      user.status = "Active";
      user.save();
      res.status(200).json({
        status: "CONFIRMATION_SUCCEDED",
        message: "User confirmation succeded"
      });
    })
    .catch(err => {
      res.status(500).json({
        status: "CONFIRMATION_ERROR",
        message: err.message
      });
    });
});

router.post("/forgot-password", (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        res.status(404).json({
          status: "FORGOT-PASSWORD_USER_NOT_FOUND",
          message: "Something went wrong"
        });
      }
      // TODO: Allow to reset password if provider is different than LOCAL
      if (user.passportProvider !== "Local") {
        res.status(404).json({
          status: "FORGOT-PASSWORD_STRATEGY_IS_NOT_LOCAL",
          message: `Your account has been created with: ${user.passportProvider}`
        });
        return;
      }

      user.resetPasswordToken = crypto.randomBytes(20).toString("hex");
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now;

      user.save();

      transporter
        .sendMail({
          from: `Tier Games`,
          to: user.email,
          subject: "Reset your password",
          html: forgotPasswordEmailTemplate.template(
            user.resetPasswordToken,
            user
          )
        })
        .then(emailSent => {
          res.status(200).json({
            status: "FORGOT-PASSWORD__SUCCEDED",
            message: "User found and email sent successfully"
          });
        })
        .catch(err => {
          res.json({ message: "Something went wrong", err: err.message });
        });
    })

    .catch(err => {
      res.status(500).json({
        status: "FORGOT-PASSWORD_ERROR",
        message: err.message
      });
    });
});

const findUserByResetPasswordToken = resetPasswordToken => {
  return User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpires: { $gt: Date.now() }
  });
};

router.post("/reset-password/:resetPasswordToken", (req, res, next) => {
  const { resetPasswordToken } = req.params;

  findUserByResetPasswordToken(resetPasswordToken)
    .then(user => {
      if (!user) {
        res.status(404).json({
          status: "RESET-PASSWORD_TOKEN_NOT_FOUND_OR_EXPIRED",
          message: `User not found with reset token: ${resetPasswordToken}`
        });
        return;
      }

      res.status(200).json({
        status: "RESET-PASSWORD_SUCCEDED",
        message: "User found successfully"
      });
    })
    .catch(err => {
      res.status(500).json({
        status: "RESET-PASSWORD_ERROR",
        message: err.message
      });
    });
});

router.post("/update-password/:resetPasswordToken", (req, res, next) => {
  const { password } = req.body;
  const { resetPasswordToken } = req.params;

  if (!password) {
    res.json({ message: "Please fill password field" });
    return;
  }

  findUserByResetPasswordToken(resetPasswordToken)
    .then(user => {
      if (!user) {
        res.status(404).json({
          status: "UPDATE-PASSWORD_USER_NOT_FOUND",
          message: `User not found with reset token: ${resetPasswordToken}`
        });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashedPassword = bcrypt.hashSync(password, salt);

      user.password = hashedPassword;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      user.save();

      res.status(200).json({
        status: "UPDATE-PASSWORD_SUCCEDED",
        message: "User found successfully and password updated"
      });
    })
    .catch(err => {
      res.status(500).json({
        status: "UPDATE-PASSWORD_FAILED",
        message: err.message
      });
    });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "logged out" });
});

// Social

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"]
  })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: `${process.env.HOST_LOCAL}`,
    failureRedirect: `${process.env.HOST_LOCAL}/login`
  })
);

// TODO: Google creates a new user account everytime the user logs in
router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.HOST_LOCAL}`,
    failureRedirect: `${process.env.HOST_LOCAL}/login`
  })
);

module.exports = router;