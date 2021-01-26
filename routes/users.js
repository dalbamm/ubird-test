var express = require('express');
var jwtCustom = require('../jwt');
var router = express.Router();
var cors=require('cors');

var User = require('../entity/user.js')

console.log(jwtCustom)

/* GET users listing. */
router.get('/signin', function(req, res, next) {
  let acntObj= req.body;
  console.log(acntObj);
  res.send(jwtCustom);
});

//sign in
router.post('/signin', function(req, res, next) {
  let acntObj= req.body;
  //console.log(acntObj);
  let usr=new User(acntObj["email"],"0");
  console.log(usr.toObj());
  let tok=jwtCustom.generate(usr.toObj())
  console.log(tok);
  res.send(tok);
});

router.get('/signup', function(req, res, next) {
  res.send('signup');
});

router.options('/validate', function(req, res, next) {
  let token=req.body;
  res.send('validate');
});

module.exports = router;
