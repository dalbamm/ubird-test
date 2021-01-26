var express = require('express');
var jwt = require('../jwt');
var mondb = require('../db');
var router = express.Router();
var cors = require('cors');

var User = require('../entity/user.js')
var Account = require('../entity/account.js')

console.log(jwt)
//should be deprecated for security
router.get('/secret', async function (req, res, next) {
  let rst = await mondb.findSecretkey();
  res.send(rst);
});
//should be deprecated for security
router.post('/secret', async function (req, res, next) {
  let secretVal = req.body;
  console.log(secretVal)
  let rst = await mondb.insertSecretkey(secretVal);
  res.send(rst);
});

/* GET users listing. */
router.get('/signin', function (req, res, next) {
  let acntObj = req.body;
  console.log(acntObj);
  res.send(jwt);
});

//sign in
router.post('/signin', async function (req, res, next) {
  let acntObj = req.body;
  //console.log(acntObj);

  let rst = await mondb.findAccount(acntObj)
  console.log("rst_post:");
  console.log(rst);
  if(rst===null){
    res.status(401).send({ "msg": "Invalid account" })
  }
  else{
    res.status(200).send({ "Authorization": jwt.generate({email:rst["email"], id:rst["_id"]}) });
  }
})


  // if (acntFromDb === null) {
  //   res.send({ "msg": "Not found" })
  //   return;
  // }
  

//let usr=new User(acntObj["email"],"0");
//console.log(usr.toObj());
//mondb.findAccount(usr.toObj());


router.post('/signup', function (req, res, next) {
  let acntObj = req.body;
  //console.log(acntObj);

  let acntFromDb = mondb.insertAccount(acntObj);
  console.log(acntFromDb);


  //let usr=new User(acntObj["email"],"0");

  //console.log(usr.toObj());



  //let tok=jwt.generate(usr.toObj())

  //mondb.findAccount(usr.toObj());

  ///console.log(tok);
  res.send(acntFromDb);
});

router.post('/validate', function (req, res, next) {
  let token = req.body;
  res.send('validate');
});

module.exports = router;
