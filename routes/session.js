var express = require('express');
var passport = require('passport');
var Session = require('../models/Session');
var router = express.Router();

router.get('/create-session', (req, res) => {
  let session = new Session();

  session.save(function(err, data) {
    if (err) { 
      console.log(err);
      res.render('error')
    } else {
      res.redirect('/session/' + data._id)
    }
  })
})

router.get('/session/:id', (req, res) => {
  if (req.params.id) {
    Session.findOne({_id: req.params.id }, (err, data) => {
      if (err) {
        console.log(err);
        res.render('error')
      }

      if (data) {
        Session.find({_id: req.params.id}, (err, data) => {
          res.render('session', {
            code: data.code , 
            sessionId: data._id
          })
        })
      } else {
        res.render('error')
      }
    })
  } else {
    res.render('error')
  }
})

module.exports = router;