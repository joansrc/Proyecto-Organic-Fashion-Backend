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
  celular: {
    type: String,
    required: true,
  },
  edad: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('vendors', vendorSchema);