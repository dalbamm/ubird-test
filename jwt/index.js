var jwt = require('jsonwebtoken');
var token = jwt.sign({ id: 'bar' }, 'shhhhh');

module.exports = token;
