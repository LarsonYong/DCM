'use strict'
var Status = require('../models/status.server.model.js');
var ping = require('ping');
var mongoose = require('mongoose')
const moment = require('moment-timezone');
var hosts = [''];

getUnitIP();



function getUnitIP(){
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("userbase");
    dbo.collection("nodes").find({}).toArray(function(err, result) {
      if (err) throw err;
      db.close()
      result.forEach(function(node){
        ping.sys.probe(node.Software.IP_address, function(isAlive) {
          var msg = isAlive ? 'Unit ' + node.UnitID + ' is alive': 'Unit ' + node.UnitID + ' is dead';
          console.log(msg);
          console.log(node.UnitID + ': ' + node.Software.IP_address)
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          const currentTime = moment().tz(timezone).format();
          // console.log(currentTime)
          if (isAlive === true){
            MongoClient.connect(url, function(err, db) {
              if (err) throw err;
              var dbo = db.db("userbase");
              var myquery = { UnitID: node.UnitID };
              var newvalues = { $set: {UnitOnline: isAlive, UnitLastOnline: currentTime} };
               dbo.collection("status").updateOne(myquery, newvalues, function(err, res) {
                 if (err) throw err;
                 console.log('Unit '+ node.UnitID + " updated: " + isAlive + '. Checked time: ' + currentTime);
                   db.close();
               });
            });
          }else{
            MongoClient.connect(url, function(err, db) {
              if (err) throw err;
              var dbo = db.db("userbase");
              var myquery = { UnitID: node.UnitID };
              var newvalues = { $set: {UnitOnline: isAlive} };
               dbo.collection("status").updateOne(myquery, newvalues, function(err, res) {
                 if (err) throw err;
                 console.log('Unit '+ node.UnitID + " updated: " + isAlive + '. Checked time: ' + currentTime);
                 db.close();
               });
            });
          }
        })
      })
    });
  });
}
