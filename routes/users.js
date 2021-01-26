var express = require('express');
var jwtCustom = require('../jwt');
var User = require('../entity/user.js')
var router = express.Router();

console.log(jwtCustom)

/* GET users listing. */
router.get('/signin', function(req, res, next) {
  let acntObj= req.body;
  console.log(acntObj);
  res.send(jwtCustom);
});

//sign in
router.options('/signin', function(req, res, next) {
  let acntObj= req.body;
  console.log(acntObj);
  
  let rst=new User(acntObj["email"],"0");
  res.send(jwtCustom.generate(rst.toObj()));
});

router.get('/signup', function(req, res, next) {
  res.send('signup');
});

router.get('/validate', function(req, res, next) {
  res.send('validate');
});

module.exports = router;
