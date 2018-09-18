// ./express-server/controllers/status.controller.js
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config'
var fs = require('fs')

export const getData = (req, res) => {
  var token = req.headers['x-access-token'];
  if (!token) {
      return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      return res.status(500).send({auth: false, message: 'Failed to authenticate token.',err})
    }

    var id = req.params.id
    var url = 'py/' + id + '.json'
    console.log(url)
    fs.readFile(url, 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      console.log(data);
      return res.status(200).send({'auth': true, 'message':'Result fetched successfully','decoded': decoded, 'result': data})
    })

  })
}

export const analyzeUnit = (req,res) => {
  var spawn = require("child_process").spawn;
  var exec = require('child_process').exec,child;
  var token = req.headers['x-access-token'];
  if (!token) {
      return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      return res.status(500).send({auth: false, message: 'Failed to authenticate token.',err})
    }
    console.log(req.body.data)
    var options = '-i ' + req.body.data.unitIP + ' -p ' + req.body.data.password + ' -t ' + req.body.data.unitID
    console.log(options)
    exec('python ./py/draft.py ' + options, (err, stdout, stderr) => {
      if (err) {
        console.error(`exec error: ${err}`);
        return res.status(304).send({'auth': true, 'message':'Error','decoded': decoded, 'error': err});
      }

      console.log(`Number of files ${stdout}`);
      return res.status(200).send({'auth': true, 'message':'Analyze done','decoded': decoded})
    });


  })
}
