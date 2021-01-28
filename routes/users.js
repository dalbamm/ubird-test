var express = require('express');
var jwt = require('../jwt');
var mondb = require('../db');
var router = express.Router();
var cors = require('cors');

var User = require('../entity/user.js')
var Account = require('../entity/account.js')

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
  res.setHeader("Set-Cookie",`access_token=${token}`).send(jwt);
});

//sign in
router.post('/signin', async function (req, res, next) {
  let acntObj = req.body;
  //console.log(acntObj);

  let rst = await mondb.findAccount(acntObj)
  console.log("rst_post:");
  console.log(rst);
  if(rst===null){
    res.status(401).send({ "result": "fail" })
  }
  else{
    let token = jwt.generate({email:rst["email"], id:rst["_id"]})
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Authorization")
    res.setHeader("Set-Cookie",`token=${token};Domain=sangchu.net;Path=/;Max-Age=1000;Expires=Thr, 28 Dec 2021 23:28:00 GMT;`)
    res.status(200).send({ "result": "ok" });
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

router.post('/validate', async function (req, res, next) {
  let token = null;
  let scrtKey=await mondb.findSecretkey();
  console.log("scrtKey");
  console.log(scrtKey);
  let rst=null;
  try{
    token= req.body["token"];
    console.log(token);
    rst=jwt.validate(token, scrtKey["secretKey"]);

  } catch(e) {
    console.error("/validate")
    console.error(e)
    res.status(400).send({"result":"error","detail":e})
  }
  res.send(rst);
});

//duplicate check

module.exports = router;
