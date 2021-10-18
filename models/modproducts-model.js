const mongoose = require('mongoose');
const { Schema } = mongoose;

//columnas
const productSchema = new Schema({
  // _id: String,
  descripcion: {
    type: String,
    required: true,
  },
  marca: {
    type: String,
    required: true,
  },
  valor: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Products', productSchema);