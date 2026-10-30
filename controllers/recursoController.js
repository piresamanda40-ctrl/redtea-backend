const Recurso = require('../models/Recurso');

// 1. Ver todos los recursos
const obtenerRecursos = async (req, res) => {
  try {
    const { provincia, categoria } = req.query;
    let filtro = {};

    if (provincia) filtro.provincia = provincia;
    if (categoria) filtro.categoria = categoria;

    const recursos = await Recurso.find(filtro);
    res.json(recursos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los recursos', error });
  }
};

// 2. Crear un recurso nuevo
const crearRecurso = async (req, res) => {
  try {
    const nuevoRecurso = new Recurso(req.body);
    const recursoGuardado = await nuevoRecurso.save();
    res.status(201).json(recursoGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear el recurso', error });
  }
};

module.exports = {
  obtenerRecursos,
  crearRecurso
};