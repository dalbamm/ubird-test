var jwt = require('jsonwebtoken');
var token = jwt.sign({ id: 'test', pw:'test' }, 'shhhhh');

module.exports = token;