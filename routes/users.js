var express = require('express');
// var passport = require('passport');
var User = require('../models/User');
var router = express.Router();

/* GET users listing. */
router.get('/', 
  function(req, res, next) {
    console.log("requsdder", req.user)
    res.render('index', {title:'Dropout', profile:req.user});
  });

router.post('/recieve-gist', async (req, res) => {
  if (!req.body.access_token && !req.body.gistUrl) {
    throw new Error('access_token and gisturl required')
  }
  const token = req.body.access_token;
  const gistUrl = req.body.gistUrl;

  try {
    const ourUser = User.findOne({access_token: token});
    ourUser.gists.push(gistUrl);
    ourUser.save(function() {
      return res.json(req.body)
    })
  } catch (error) {
    console.log(error)
    res.send(error)
  }
});


module.exports = router;
