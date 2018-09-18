// ./express-server/controllers/status.controller.js
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config'
var exec = require('child_process').exec,child;

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

export const syncUnits = (req, res) => {
  var token = req.headers['x-access-token'];
  if (!token) {
      return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      return res.status(500).send({auth: false, message: 'Failed to authenticate token.',err})
    }
    console.log("Refreshing Units status");
    child = exec('node lib/ping-worker.js',
      function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
          return res.status(404).send({'auth':true, 'message':"Error with refresh"})
        }
        console.log("All Done")
        return res.status(200).send({'auth':true, 'message':"Finished refresh"})
    });
    console.log("All Done 2")

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
