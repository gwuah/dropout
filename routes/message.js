var Message = require('../models/Message');
var express = require('express');
var router = express.Router();

router.get('/get-messages/:session_id', (req, res) => {
  Message.find({session_id: req.params.session_id}, (err, messages) => {
    if (err) { return res.render('error') }
    return res.json(messages)
  })
})

module.exports = router;