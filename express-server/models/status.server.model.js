var mongoose = require('mongoose');

var StatusSchema = new mongoose.Schema({
  UnitID: String,
  UnitOnline: Boolean,
  UnitLastOnline: String,
  UnitOccupied: Boolean
});

var Status = mongoose.model('Status', StatusSchema);
module.exports = Status;
