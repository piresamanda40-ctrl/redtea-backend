const mongoose = require('mongoose');

const recursoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  categoria: { type: String },
  provincia: { type: String },
  edad: { type: String },
  web: { type: String },
  telefono: { type: String }
});

module.exports = mongoose.model('Recurso', recursoSchema);