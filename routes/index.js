var express = require("express");
var passport = require("passport");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  // console.log("requser", req.user)
  res.send();
  // res.render('user', {title:'Dropout', profile:req.user});
});

router.get("/login", (req, res) => {
  res.send("login page");
});

router.get("/auth/github", passport.authenticate("github"));

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log("auth was sucessful");
    console.log("code", req.query.code);
    // res.send("Authentication Sucessful")
    console.log("meeuser", req.user);
    return res.redirect("/user");
  }
);

module.exports = router;
