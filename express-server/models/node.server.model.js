var mongoose = require('mongoose');

var NodeSchema = new mongoose.Schema({
  UnitID: String,
  Software: {
    BuildVersion: String,
    PrimaryInterface: String,
    IP_address: String,
    BackDoor_IP: String,
    SensorBoardVersion: String,
    AP: String
  },
  Hardware: {
    UPS: String,
    SensorBoard: String,
    Platform: String,
    WIFIModule: String,
    FourGModule: String,
    SIM:{
      Carrier: String,
      APN: String,
      IP_address: String
    },
    ResetBoard: String,
    Camera: {
      manufacturer: String,
      Type: String,
      lens: String
    },
    SSD: {
      manufacturer: String,
      Type: String,
      Capacity: String
    }
  },
  Test: {
    Who: String,
    What: String,
    When: String
  }
});

var Node = mongoose.model('Node', NodeSchema);
module.exports = Node;
