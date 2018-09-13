// ./express-server/controllers/status.controller.js
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config'

// import models
import Status from '../models/status.server.model.js';

export const getData = (req, res) => {
  var token = req.headers['x-access-token'];
  if (!token) {
      return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      return res.status(500).send({auth: false, message: 'Failed to authenticate token.',err})
    }
    Status.find().exec((err, status) => {
      if (err){
        return res.json({'auth':true, 'message':"Some Error", err})
      }
      return res.status(200).send({'auth': true, 'message':'Status fetched successfully','decoded': decoded, 'status': status})
    })
  })
}


// var token = req.headers['x-access-token'];
// if (!token) {
//     return res.status(401).send({ auth: false, message: 'No token provided.' });
//   }
// jwt.verify(token, config.secret, function (err, decoded) {
//   if (err) {
//     return res.status(500).send({auth: false, message: 'Failed to authenticate token.',err})
//   }
//
// })
