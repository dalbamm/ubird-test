var express = require('express');
var jwt = require('../jwt');
var router = express.Router();

/* GET users listing. */
router.get('/signin', function(req, res, next) {
  res.send(jwt);
});

router.get('/signup', function(req, res, next) {
  res.send('signup');
});

router.get('/validate', function(req, res, next) {
  res.send('validate');
});

module.exports = router;
