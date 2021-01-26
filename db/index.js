var sctKey = require('jsonwebtoken');
//var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

var MongoClient = require('mongodb').MongoClient;
const dbHost = "54.180.120.187"
const dbName = "ubird";
const dbId = "root"
const dbPw = "!dlatl00";
const collectionName = "account";
const secretKeycollectionName = "secretkey";

var url = `mongodb://${dbId}:${dbPw}@${dbHost}:27017/`;

let createDB = () => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database created!");

    var dbo = db.db(dbName);
    dbo.createCollection("account", function (err, res) {
      if (err) throw err;
      console.log("collection created");

    })

    db.close();
  })
}

let insertAccount = (acnt) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database created!");

    var dbo = db.db(dbName);
    dbo.collection(collectionName).insertOne(acnt, function (err, res) {
      if (err) throw err;

      console.log("1 document inserted");
      db.close();
    })
  })
}

//db connection

async function findAccount(acnt) {
  let cli= await MongoClient.connect(url, { useNewUrlParser: true })
    .catch(err => { console.log(err); });
  let rst=null;
  if (!cli) return

  try {

    const db = cli.db(dbName);
    let collection = db.collection(collectionName);
    let query = acnt;
    rst = await collection.findOne(query)

  } catch (err) {

    console.log(err);
  } finally {

    cli.close();
    return rst;
  }


  let client = await MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var query = acnt;
    var dbo = db.db(dbName);
    dbo.collection(collectionName).findOne(query, function (err, result) {
      if (err) throw err;
      console.log("findAccount result");
      rst = result

    })
    db.close();
  });
  console.log("rst");
  console.log(rst);
  return rst;
}
//__list() (find all user)

//insertByInfo(id, pw)

//findBySecretKey(sctKey)
let findSecretkey = () => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    dbo.collection(secretKeycollectionName).findOne({}, function (err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    })
  });
}
//encryptSecretKey()
let insertSecretkey = (secretkey) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database created!");

    var dbo = db.db(dbName);
    dbo.collection(secretKeycollectionName).insertOne(secretkey, function (err, res) {
      if (err) throw err;

      console.log("1 document inserted");
      db.close();
    })
  })
}

module.exports = { insertAccount, findSecretkey, findAccount, insertSecretkey };