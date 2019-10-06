const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const login = (req, user) => {
  return new Promise((resolve, reject) => {
    req.login(user, err => {
      console.log('req.login ')
      console.log(user)
      
      if(err) {
        reject(new Error('Something went wrong'))
      }else{
        resolve(user);
      }
    })
  })
}

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    // Check if there are errors
    if (err) next(new Error('Something went wrong')); 
    if (!theUser) next(failureDetails)

    // If the loggin is OK, return the user and logged in
    login(req, theUser).then(() => res.status(200).json(req.user));

  })(req, res, next);
});

router.post("/signup", (req, res, next) => {
  const {username, password, email, confirmPassword} = req.body

  if (!username || !password || !email || !confirmPassword) {
    res.json({ message: "Please fill all the fields" });
    return;
  }

  if (password !== confirmPassword) {
    res.json({message: "Passwords don't match"})
    return
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.json({ message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    newUser.save()
    .then((newUserCreated) => {
      res.json(newUserCreated);
    })
    .catch(err => {
      res.json({ message: "Something went wrong" });
    })
  });
});

router.get('/currentuser', (req, res, next) => {
  if(req.user){
    res.status(200).json(req.user);
  }else{
    next(new Error('Not logged in'))
    // res.status(500).json({message: "Not logged in"});
  }
})

router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({message:'logged out'})
});

module.exports = router;
