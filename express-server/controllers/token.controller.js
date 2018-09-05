var jwt = require('jsonwebtoken');
var config = require('../config');

function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];

  if (!token){
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }
  jwt.verify(token, config.secret, function(err, decoded) {
    console.log(decoded)
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.',err });
    }
    // if everything good, save to request for use in other routes
    return res.status(200).send({auth:true, message: 'Token verified'})
    // next();
  });
}

module.exports = verifyToken;
