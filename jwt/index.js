var jwt = require('jsonwebtoken');
var secretKey="secret"
var errorKey="error"
var token = jwt.sign({ id: '1234', email: 'test' }, secretKey);


()=>{
  console.log(token);
}
// jwt generation
let generate=(obj)=>{
  if(typeof(obj)!=='object'){
    return jwt.sign({"message":"The type of an argument is not object"}, errorKey);
  }
  var token_gen = jwt.sign(obj, secretKey);
  return token_gen;
}
// "/validate" jwt validation

// get secretKey from DB for jwt validation

// get secretKey from DB for jwt validation

// "/validate" jwt validation

// "/validate" jwt validation

//

module.exports = {token, generate}