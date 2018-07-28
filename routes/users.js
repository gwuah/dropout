var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET users listing. */
router.get('/', 
  function(req, res, next) {
    console.log("requsdder", req.user)
    res.render('user', {title:'Dropout', profile:req.user});
  });

module.exports = router;
