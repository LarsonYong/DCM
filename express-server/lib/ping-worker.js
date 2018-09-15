'use strict'
// import mongoose from 'mongoose';
// import Status from '../models/status.server.model.js';
var Status = require('../models/status.server.model.js');
var ping = require('ping');
var mongoose = require('mongoose')

var hosts = ['10.70.35.34', 'google.com', 'yahoo.com'];
hosts.forEach(function(host){
    ping.sys.probe(host, function(isAlive){
        var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
        console.log(msg);

    });
});
//
// function getUnitIP(){
//   console.log("1111")
//   Status.find().exec((err,status) => {
//     if (err){
//       console.log(err)
//     }
//     var UnitIPs = status
//     console.log(UnitIPs)
//   })
// }
