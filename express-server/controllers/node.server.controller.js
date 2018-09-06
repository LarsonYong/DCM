// ./express-server/controllers/node.server.controller.js
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config'


// import models
import Node from '../models/node.server.model.js';

export const getNodes = (req, res) => {
  var token = req.headers['x-access-token'];
  if (!token) {
      return res.status(401).send({ auth: false, message: 'No token provided.' });
    }

  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      return res.status(500).send({auth: false, message: 'Failed to authenticate token.',err})
    }
    Node.find().exec((err, nodes) => {
      if (err){
        return res.json({'auth':true, 'message':"Some Error", err})
      }
      return res.status(200).send({'auth': true, 'message':'Nodes fetched successfully','decoded': decoded, 'nodes': nodes})
    })
  })
}

export const addNode = (req,res) => {
  var token = req.headers['x-access-token'];
  if (!token) {
      return res.status(401).send({ auth: false, message: 'No token provided.' });
    }

  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      return res.status(500).send({auth: false, message: 'Failed to authenticate token.',err})
    }
    Node.count({"UnitID":req.body.UnitID}).exec((err,data) => {
      if(err){
        return res.status(500).send({auth: false, message: 'Failed to authenticate token.',err})
      }
      if(data > 0){
        return res.status(500).send({auth: false, message: 'Unit already exist.'})
      }
      newNode.save((err, node) => {
        if (err){
          return res.json({"auth": true, "success":false, "message": err})
        }
        console.log("Node added")
        res.status(200).send({"auth": true, "success": true, "message": "Node added", node})
      })
    })
    const newNode = new Node(req.body);

  })
}

export const updateNode = (req,res) => {
  var token = req.headers['x-access-token'];
  if (!token) {
      return res.status(401).send({ auth: false, message: 'No token provided.' });
    }

  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      return res.status(500).send({auth: false, message: 'Failed to authenticate token.',err})
    }else{
      var unit_id = req.params.id

      Node.find({"UnitID":req.params.id}, function(err,data) {
        if (data.length !== 1){
          return res.status(404).send({auth: true, message:"No suck node",err})
        }else{
          Node.findOneAndUpdate({"UnitID":req.params.id}, {$set:req.body},{new: true}, function(err,result){
            if (err){
              return res.status(500).send({auth:true,success: false, message:err})
            }else {
              console.log("Node updated")
              return res.status(202).send({auth:true,success:true, message:"Node updated",node:result})
            }
          })
        }
      })
    }

  })
}

export const getNode = (req, res ) => {
  var token = req.headers['x-access-token'];
  if (!token) {
      return res.status(401).send({ auth: false, message: 'No token provided.' });
    }

  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      return res.status(500).send({auth: false, message: 'Failed to authenticate token.',err})
    }
    Node.find({"UnitID":req.params.id}, function(err, data){
      if (data.length === 1){
        return res.status(200).send({"auth": true, "success":true, "message": "Node fetched", data})
      }else {
        console.log("Get node ")
        return res.status(404).send({"auth": true, "success":false,"message":"Can not find this node!"})
      }
    })
  })
}

export const deleteNode = (req, res) => {
  var token = req.headers['x-access-token'];
  if (!token) {
      return res.status(401).send({ auth: false, message: 'No token provided.' });
    }

  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      return res.status(500).send({auth: false, message: 'Failed to authenticate token.',err})
    }
    Node.find({"UnitID":req.params.id}, function(err, data){

      if (data.length === 1){
        Node.findOneAndRemove({"UnitID":req.params.id},function(err) {
          console.log("Node removed")
          return res.status(200).send({"auth": true, "success":true, "message": "Node removed"})
        })
      }else{
        return res.status(404).send({"auth": true, "success":false,"message":"Node does not exist!"})
      }
    })
  })
}
