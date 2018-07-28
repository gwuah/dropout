var express = require("express");
var passport = require("passport");
var Session = require("../models/Session");
var router = express.Router();

router.get("/create-session/:token", (req, res) => {
  let session = new Session({token: req.params.token });

  session.save(function(err, data) {
    if (err) {
      console.log(err);
      res.render("error");
    } else {
      res.redirect(`/session/${data._id}/${data.token}`);
    }
  });
});

router.get("/session/:id/:token", (req, res) => {
  console.log(req.params.token)

  if (req.params.id) {
    Session.findOne({ _id: req.params.id }, (err, data) => {
      if (err) {
        console.log(err);
        res.render("error");
      }

      if (data) {
        Session.find({ _id: req.params.id }, (err, data) => {
          console.log(data);
          res.render("session", {
            code: data.code,
            sessionId: data._id
          });
        });
      } else {
        res.render("error");
      }
    });
  } else {
    res.render("error");
  }
});

module.exports = router;
