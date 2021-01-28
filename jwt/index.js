var jwt = require('jsonwebtoken');
var secretKey="secret"
var errorKey="error"
//var token = jwt.sign({ id: '1234', email: 'test' }, secretKey);

// jwt generation
let generate=(obj)=>{
  if(typeof(obj)!=='object'){
    return jwt.sign({"message":"The type of an argument is not object"}, errorKey);
  }
  var token_gen = jwt.sign(obj, secretKey);
  return token_gen;
}
// "/validate" jwt validation
let validate=(token, secretKey)=>{
  
  let rst;
  try{rst= jwt.verify(token, secretKey);}
  catch(e){console.error(e) ; throw e;}
  return rst;
}
// get secretKey from DB for jwt validation

// get secretKey from DB for jwt validation

// "/validate" jwt validation

// "/validate" jwt validation

//

module.exports = {generate, validate}