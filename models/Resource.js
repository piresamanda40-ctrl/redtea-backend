const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'Asociación Autismo Bizkaia'],
      trim: true,
    },
    descripcion: {
      type: String,
      required: [true, 'Apoyo, orientación y servicios para personas con autismo y sus familias.'],
      trim: true,
    },
    categoria: {
      type: String,
      required: [true, 'Asociaciones'],
      trim: true,
    },
    provincia: {
      type: String,
      required: [true, 'Bizkaia'],
      trim: true,
    },
    edad: {
      type: String,
      default: 'Todas las edades',
      trim: true,
    },
    web: {
      type: String,
      default: '',
      trim: true,
    },
    telefono: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Resource', resourceSchema);