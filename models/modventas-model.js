const mongoose = require('mongoose');
const { Schema } = mongoose;

//columnas
const ventaSchema = new Schema({
  // _id: String,
 
  fecha: {
    type: String,
    required: true,
  },
  total: {
    type: String,
    required: true,
  },

  cedulacliente: {
    type: String,
    required: true,
  },

  nombrecliente: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('venta', ventaSchema);