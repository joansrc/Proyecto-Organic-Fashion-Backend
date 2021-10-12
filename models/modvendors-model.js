const mongoose = require('mongoose');
const { Schema } = mongoose;

//columnas
const vendorSchema = new Schema({
  // _id: String,
  name: {
    type: String,
    required: true,
  },
  cedula: {
    type: String,
    required: true,
  },
  //done: Boolean,
});

module.exports = mongoose.model('vendors', vendorSchema);